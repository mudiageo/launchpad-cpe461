import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import * as votesService from '../services/votes.service';

export const votesRouter = Router({ mergeParams: true });

/**
 * @swagger
 * /ideas/{id}/vote:
 *   post:
 *     summary: Toggle upvote on an idea
 *     tags: [Votes]
 *     security: [{ session: [] }]
 */
votesRouter.post('/:ideaId/vote', requireAuth, async (req, res, next) => {
  try {
    const ideaId = Array.isArray(req.params.ideaId) ? req.params.ideaId[0] : req.params.ideaId;
    const result = await votesService.toggleVote(req.user!.id, ideaId);
    res.json({ success: true, data: result });
  } catch (e) { next(e); }
});