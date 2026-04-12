/**
 * Operational errors we intentionally send to the client with a specific HTTP status.
 * Unknown errors should still be handled by the global error middleware as 500s.
 */
export class AppError extends Error {
  /**
   * @param {string} message
   * @param {number} [statusCode=400]
   */
  constructor(message, statusCode = 400) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}
