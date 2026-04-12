import mongoose from 'mongoose';
import { Booking } from '../models/Booking.js';
import { Event } from '../models/Event.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function assertObjectId(id, label = 'id') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError(`Invalid ${label}`, 400);
  }
}

/**
 * Creates a booking for the authenticated user.
 * Duplicate bookings are prevented by a unique compound index on (user, event).
 */
export const createBooking = asyncHandler(async (req, res) => {
  const { eventId } = req.body || {};
  if (!eventId || typeof eventId !== 'string') {
    throw new AppError('eventId is required', 400);
  }
  assertObjectId(eventId, 'eventId');

  const event = await Event.findById(eventId).lean();
  if (!event) {
    throw new AppError('Event not found', 404);
  }

  try {
    const booking = await Booking.create({
      user: req.auth.userId,
      event: eventId,
      status: 'confirmed',
    });
    const populated = await Booking.findById(booking._id).populate('event').lean();
    res.status(201).json(populated);
  } catch (e) {
    if (e?.code === 11000) {
      throw new AppError('You have already booked this event', 409);
    }
    throw e;
  }
});

/**
 * Lists the authenticated user's bookings with event details for dashboards.
 */
export const listMyBookings = asyncHandler(async (req, res) => {
  const rows = await Booking.find({ user: req.auth.userId })
    .sort({ createdAt: -1 })
    .populate('event')
    .lean();
  res.json(rows);
});
