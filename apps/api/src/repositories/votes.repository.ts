import { db } from '../db/client';
import { votes, ideas } from '@launchpad/shared';
import { eq, and, sql } from 'drizzle-orm';

export const votesRepo = {
  async toggle(userId: string, ideaId: string): Promise<{ voted: boolean; upvoteCount: number }> {
    const existing = await db
      .select()
      .from(votes)
      .where(and(eq(votes.userId, userId), eq(votes.ideaId, ideaId)))
      .limit(1);

    if (existing.length > 0) {
      // Un-vote
      await db.delete(votes).where(eq(votes.id, existing[0].id));
      const [updated] = await db
        .update(ideas)
        .set({ upvoteCount: sql`GREATEST(${ideas.upvoteCount} - 1, 0)` })
        .where(eq(ideas.id, ideaId))
        .returning({ upvoteCount: ideas.upvoteCount });
      return { voted: false, upvoteCount: updated.upvoteCount };
    } else {
      // Vote
      await db.insert(votes).values({ userId, ideaId });
      const [updated] = await db
        .update(ideas)
        .set({ upvoteCount: sql`${ideas.upvoteCount} + 1` })
        .where(eq(ideas.id, ideaId))
        .returning({ upvoteCount: ideas.upvoteCount });
      return { voted: true, upvoteCount: updated.upvoteCount };
    }
  },

  async hasVoted(userId: string, ideaId: string): Promise<boolean> {
    const result = await db
      .select({ id: votes.id })
      .from(votes)
      .where(and(eq(votes.userId, userId), eq(votes.ideaId, ideaId)))
      .limit(1);
    return result.length > 0;
  },
};