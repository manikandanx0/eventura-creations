import { AppError } from '../utils/AppError.js';

/**
 * Restricts a route to specific roles after `protect` has populated `req.auth`.
 * @param  {...string} roles
 */
export function requireRoles(...roles) {
  return (req, _res, next) => {
    if (!req.auth) {
      return next(new AppError('Authentication required', 401));
    }
    if (!roles.includes(req.auth.role)) {
      return next(new AppError('You do not have permission to perform this action', 403));
    }
    next();
  };
}
