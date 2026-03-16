import { Router } from 'express';
import { requireAuth, optionalAuth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { CreateIdeaSchema } from '@launchpad/shared';
import * as ideasService from '../services/ideas.service';

export const ideasRouter = Router();

/**
 * @swagger
 * /ideas:
 *   get:
 *     summary: List ideas with filtering and sorting
 *     tags: [Ideas]
 *     parameters:
 *       - in: query
 *         name: sort
 *         schema: { type: string, enum: [trending, newest, votes] }
 *       - in: query
 *         name: category
 *         schema: { type: string }
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 */
ideasRouter.get('/', optionalAuth, async (req, res, next) => {
  try {
    const { sort, category, search, page, limit } = req.query;
    const result = await ideasService.listIdeas({
      sort: sort as any,
      categorySlug: category as string,
      search: search as string,
      page: page ? Number(page) : 1,
      limit: limit ? Number(limit) : 20,
    });
    res.json({ success: true, ...result });
  } catch (e) { next(e); }
});

ideasRouter.get('/:id', optionalAuth, async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const idea = await ideasService.getIdea(id);
    res.json({ success: true, data: idea });
  } catch (e) { next(e); }
});

ideasRouter.post('/', requireAuth, validate(CreateIdeaSchema), async (req, res, next) => {
  try {
    const idea = await ideasService.createIdea({ ...req.body, authorId: req.user!.id });
    res.status(201).json({ success: true, data: idea });
  } catch (e) { next(e); }
});

ideasRouter.patch('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const idea = await ideasService.updateIdea(id, req.user!.id, req.body);
    res.json({ success: true, data: idea });
  } catch (e) { next(e); }
});

ideasRouter.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    await ideasService.deleteIdea(id, req.user!.id);
    res.json({ success: true, data: null });
  } catch (e) { next(e); }
});