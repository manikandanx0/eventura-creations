import { Contact } from '../models/Contact.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const submitContact = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(message)) {
    throw new AppError('Name, email, and message are required.', 400);
  }

  const trimmed = {
    name: name.trim().slice(0, 200),
    email: email.trim().slice(0, 200),
    message: message.trim().slice(0, 8000),
  };

  if (!isValidEmail(trimmed.email)) {
    throw new AppError('Please provide a valid email address.', 400);
  }

  await Contact.create(trimmed);
  res.status(201).json({ ok: true });
});
