import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

function isNonEmptyString(v) {
  return typeof v === 'string' && v.trim().length > 0;
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Issues a signed JWT containing the user id (sub) and role for subsequent authenticated requests.
 */
function signToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );
}

function publicUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

/**
 * Public registration always creates a `user` role.
 * Organizers/admins are created via seeding or internal tooling to avoid privilege escalation.
 */
export const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body || {};

  if (!isNonEmptyString(name) || !isNonEmptyString(email) || !isNonEmptyString(password)) {
    throw new AppError('Name, email, and password are required', 400);
  }

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (trimmedName.length > 120) {
    throw new AppError('Name is too long', 400);
  }
  if (!isValidEmail(trimmedEmail)) {
    throw new AppError('Please provide a valid email address', 400);
  }
  if (trimmedPassword.length < 8) {
    throw new AppError('Password must be at least 8 characters', 400);
  }

  const exists = await User.exists({ email: trimmedEmail });
  if (exists) {
    throw new AppError('An account with that email already exists', 409);
  }

  const user = await User.create({
    name: trimmedName,
    email: trimmedEmail,
    password: trimmedPassword,
    role: 'user',
  });

  const token = signToken(user);
  res.status(201).json({ token, user: publicUser(user) });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body || {};

  if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
    throw new AppError('Email and password are required', 400);
  }

  const trimmedEmail = email.trim().toLowerCase();
  const user = await User.findOne({ email: trimmedEmail }).select('+password');
  if (!user) {
    throw new AppError('Invalid email or password', 401);
  }

  const ok = await user.comparePassword(password.trim());
  if (!ok) {
    throw new AppError('Invalid email or password', 401);
  }

  const token = signToken(user);
  res.json({ token, user: publicUser(user) });
});

/**
 * Returns the authenticated profile (requires `protect` middleware).
 */
export const me = asyncHandler(async (req, res) => {
  res.json({ user: publicUser(req.user) });
});
