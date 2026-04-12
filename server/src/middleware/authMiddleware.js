import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { AppError } from '../utils/AppError.js';

/**
 * Verifies `Authorization: Bearer <token>` and attaches lightweight auth + user payload to the request.
 * Controllers can trust `req.auth` when this middleware succeeds.
 */
export async function protect(req, _res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');
    if (scheme !== 'Bearer' || !token) {
      throw new AppError('Authentication required', 401);
    }

    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    const userId = decoded.sub;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      throw new AppError('Invalid token subject', 401);
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      throw new AppError('User no longer exists', 401);
    }

    req.auth = { userId: String(user._id), role: user.role };
    req.user = user;
    next();
  } catch (e) {
    if (e instanceof AppError) return next(e);
    if (e?.name === 'JsonWebTokenError' || e?.name === 'TokenExpiredError') {
      return next(new AppError('Invalid or expired token', 401));
    }
    next(e);
  }
}
