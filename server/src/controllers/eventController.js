import mongoose from 'mongoose';
import { Event } from '../models/Event.js';
import { Booking } from '../models/Booking.js';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function parsePositiveNumber(value, field) {
  const n = Number(value);
  if (!Number.isFinite(n) || n < 0) {
    throw new AppError(`${field} must be a non-negative number`, 400);
  }
  return n;
}

function parseEventDate(value) {
  if (value === undefined || value === null || value === '') {
    throw new AppError('date is required', 400);
  }
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) {
    throw new AppError('date must be a valid ISO date string', 400);
  }
  return d;
}

function assertObjectId(id, label = 'id') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${label}`, 400);
  }
}

/**
 * Public listing of upcoming/all events with organizer summary for display cards.
 */
export const listEvents = asyncHandler(async (_req, res) => {
  const events = await Event.find()
    .sort({ date: 1 })
    .populate('organizer', 'name email')
    .lean();
  res.json(events);
});

export const getEventById = asyncHandler(async (req, res) => {
  assertObjectId(req.params.id, 'event id');
  const event = await Event.findById(req.params.id).populate('organizer', 'name email').lean();
  if (!event) {
    throw new AppError('Event not found', 404);
  }
  res.json(event);
});

/**
 * Organizers create events for themselves; admins must specify which organizer owns the event.
 */
export const createEvent = asyncHandler(async (req, res) => {
  const { title, description, date, location, price, organizerId } = req.body || {};

  if (!isNonEmptyString(title) || !isNonEmptyString(description) || !isNonEmptyString(location)) {
    throw new AppError('title, description, and location are required', 400);
  }

  const eventDate = parseEventDate(date);
  const eventPrice = parsePositiveNumber(price, 'price');

  let organizer;
  if (req.auth.role === 'organizer') {
    organizer = req.auth.userId;
  } else if (req.auth.role === 'admin') {
    if (!isNonEmptyString(organizerId)) {
      throw new AppError('organizerId is required for admin-created events', 400);
    }
    assertObjectId(organizerId, 'organizerId');
    const orgUser = await User.findById(organizerId).lean();
    if (!orgUser || orgUser.role !== 'organizer') {
      throw new AppError('organizerId must reference an existing organizer user', 400);
    }
    organizer = organizerId;
  } else {
    throw new AppError('Forbidden', 403);
  }

  const created = await Event.create({
    title: title.trim().slice(0, 200),
    description: description.trim().slice(0, 8000),
    date: eventDate,
    location: location.trim().slice(0, 300),
    price: eventPrice,
    organizer,
  });

  const populated = await Event.findById(created._id).populate('organizer', 'name email').lean();
  res.status(201).json(populated);
});

async function loadOwnedEventOrAdmin(eventId, auth) {
  assertObjectId(eventId, 'event id');
  const event = await Event.findById(eventId);
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  const isOwner = String(event.organizer) === auth.userId;
  if (!isOwner && auth.role !== 'admin') {
    throw new AppError('You can only modify your own events', 403);
  }
  return event;
}

/**
 * Partial update: only provided fields are changed; ownership enforced unless admin.
 */
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await loadOwnedEventOrAdmin(req.params.id, req.auth);
  const { title, description, date, location, price, organizerId } = req.body || {};

  if (title !== undefined) {
    if (!isNonEmptyString(title)) throw new AppError('title cannot be empty', 400);
    event.title = title.trim().slice(0, 200);
  }
  if (description !== undefined) {
    if (!isNonEmptyString(description)) throw new AppError('description cannot be empty', 400);
    event.description = description.trim().slice(0, 8000);
  }
  if (date !== undefined) {
    event.date = parseEventDate(date);
  }
  if (location !== undefined) {
    if (!isNonEmptyString(location)) throw new AppError('location cannot be empty', 400);
    event.location = location.trim().slice(0, 300);
  }
  if (price !== undefined) {
    event.price = parsePositiveNumber(price, 'price');
  }

  if (organizerId !== undefined) {
    if (req.auth.role !== 'admin') {
      throw new AppError('Only admins may reassign organizers', 403);
    }
    if (!isNonEmptyString(organizerId)) throw new AppError('organizerId cannot be empty', 400);
    assertObjectId(organizerId, 'organizerId');
    const orgUser = await User.findById(organizerId).lean();
    if (!orgUser || orgUser.role !== 'organizer') {
      throw new AppError('organizerId must reference an existing organizer user', 400);
    }
    event.organizer = organizerId;
  }

  await event.save();
  const populated = await Event.findById(event._id).populate('organizer', 'name email').lean();
  res.json(populated);
});

/**
 * Deletes an event and its bookings to avoid orphaned reservations.
 */
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await loadOwnedEventOrAdmin(req.params.id, req.auth);
  await Booking.deleteMany({ event: event._id });
  await event.deleteOne();
  res.status(204).send();
});
