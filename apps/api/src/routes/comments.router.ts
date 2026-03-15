import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { validate } from '../middleware/validate.middleware';
import { CreateCommentSchema } from '@launchpad/shared';
import * as commentsService from '../services/comments.service';

export const commentsRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /ideas/{id}/comments:
 *   get:
 *     summary: Get all comments for an idea
 *     tags: [Comments]
 */
commentsRouter.get('/:ideaId/comments', async (req, res, next) => {
  try {
    const data = await commentsService.getComments(req.params.ideaId);
    res.json({ success: true, data });
  } catch (e) { next(e); }
});