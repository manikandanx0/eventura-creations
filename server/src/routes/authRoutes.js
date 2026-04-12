import { Router } from 'express';
import { login, me, register } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
// Used by the SPA to restore sessions from a stored JWT without decoding it client-side.
router.get('/me', protect, me);

export default router;
