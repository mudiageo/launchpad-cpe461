import { db } from '../db/client';
import { comments, users } from '@launchpad/shared';
import { eq, desc, and } from 'drizzle-orm';

export const commentsRepo = {
  async findByIdeaId(ideaId: string) {
    return db
      .select({
        id: comments.id,
        body: comments.body,
        createdAt: comments.createdAt,
        author: { id: users.id, name: users.name, avatarUrl: users.avatarUrl },
      })
      .from(comments)
      .leftJoin(users, eq(comments.authorId, users.id))
      .where(eq(comments.ideaId, ideaId))
      .orderBy(desc(comments.createdAt));
  },

  async create(data: { body: string; authorId: string; ideaId: string }) {
    const [comment] = await db.insert(comments).values(data).returning();
    return comment;
  },

  async findById(id: string) {
    const [comment] = await db
      .select()
      .from(comments)
      .where(eq(comments.id, id))
      .limit(1);
    return comment ?? null;
  },

  async deleteById(id: string) {
    await db.delete(comments).where(eq(comments.id, id));
  },
};