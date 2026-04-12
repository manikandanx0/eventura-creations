import { Router } from 'express';
import {
  createEvent,
  deleteEvent,
  getEventById,
  listEvents,
  updateEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { requireRoles } from '../middleware/roleMiddleware.js';

const router = Router();

router.get('/', listEvents);
router.get('/:id', getEventById);
router.post('/', protect, requireRoles('organizer', 'admin'), createEvent);
router.put('/:id', protect, requireRoles('organizer', 'admin'), updateEvent);
router.delete('/:id', protect, requireRoles('organizer', 'admin'), deleteEvent);

export default router;
