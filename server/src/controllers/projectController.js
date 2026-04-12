import { Project } from '../models/Project.js';
import { AppError } from '../utils/AppError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const listProjects = asyncHandler(async (_req, res) => {
  const rows = await Project.find().select('-caseStudy').sort({ year: -1, title: 1 }).lean();
  res.json(rows);
});

export const getProjectBySlug = asyncHandler(async (req, res) => {
  const doc = await Project.findOne({ slug: req.params.slug }).lean();
  if (!doc) {
    throw new AppError('Project not found', 404);
  }
  res.json(doc);
});
