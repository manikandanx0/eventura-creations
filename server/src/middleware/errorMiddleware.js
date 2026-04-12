/**
 * Final catch-all for unknown routes (404 JSON).
 */
export function notFoundHandler(req, res) {
  res.status(404).json({ message: 'Not found' });
}

/**
 * Centralized error formatting: operational AppError -> status + message; everything else -> 500.
 * Also maps common Mongoose errors to safe 400 responses.
 */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return;
  }

  if (err?.name === 'ValidationError') {
    const parts = Object.values(err.errors || {}).map((e) => e.message);
    const message = parts.join(', ') || 'Validation error';
    return res.status(400).json({ message });
  }

  if (err?.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid id' });
  }

  if (err?.code === 11000) {
    return res.status(409).json({ message: 'Duplicate record' });
  }

  const statusCode = err.statusCode && err.isOperational ? err.statusCode : 500;
  const message = statusCode === 500 ? 'Unexpected server error' : err.message;

  if (statusCode >= 500) {
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(statusCode).json({ message });
}
