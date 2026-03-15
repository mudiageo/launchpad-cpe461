import { Router } from 'express';
import { db } from '../db/client';
import { schema } from '@launchpad/shared';

export const categoriesRouter = Router();

/**
 * @swaggers
 * /categories:
 *   get:
 *     summary: List all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Array of categories
 */
 categoriesRouter.get('/', async (_req, res, next) => {
  try {
    const all = await db.select().from(schema.categories);
    res.json({ success: true, data: all });
  } catch (e) {
    next(e);
  }
});