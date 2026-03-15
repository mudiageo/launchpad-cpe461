import { Router } from 'express';

import { requireAuth } from '../middlewares/auth.middleware';
import { db } from '../db/client';
import { ideas, users } from '@launchpad/shared';
import { eq, desc } from 'drizzle-orm';

export const usersRouter = Router();

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security: [{ session: [] }]
 */
usersRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    res.json({ success: true, data: req.user });
  } catch (e) {
    next(e);
  }
});

/**
 * @swagger
 * /users/me/ideas:
 *   get:
 *     summary: Get ideas submitted by the current user
 *     tags: [Users]
 *     security: [{ session: [] }]
 */
usersRouter.get('/me/ideas', requireAuth, async (req, res, next) => {
  try {
    const myIdeas = await db
      .select()
      .from(ideas)
      .where(eq(ideas.authorId, req.user!.id))
      .orderBy(desc(ideas.createdAt));
    res.json({ success: true, data: myIdeas });
  } catch (e) {
    next(e);
  }
});