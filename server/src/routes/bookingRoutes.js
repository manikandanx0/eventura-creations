import { Router } from 'express';
import { createBooking, listMyBookings } from '../controllers/bookingController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

// Register the static path before `/` POST handlers to avoid accidental collisions if routes grow.
router.get('/me', protect, listMyBookings);
router.post('/', protect, createBooking);

export default router;
