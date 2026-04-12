import { Router } from 'express';
import { getProjectBySlug, listProjects } from '../controllers/projectController.js';

const router = Router();

router.get('/', listProjects);
router.get('/:slug', getProjectBySlug);

export default router;
