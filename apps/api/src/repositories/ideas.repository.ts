import { db } from '../db/client';
import { ideas, votes, users, categories } from '@launchpad/shared';
import { eq, desc, ilike, and, sql, asc } from 'drizzle-orm';

type ListOptions = {
  sort?: 'trending' | 'newest' | 'votes';
  categorySlug?: string;
  search?: string;
  page?: number;
  limit?: number;
};

const baseSelect = {
  id: ideas.id,
  title: ideas.title,
  description: ideas.description,
  upvoteCount: ideas.upvoteCount,
  createdAt: ideas.createdAt,
  updatedAt: ideas.updatedAt,
  author: { id: users.id, name: users.name, avatarUrl: users.avatarUrl },
  category: { id: categories.id, name: categories.name, slug: categories.slug, icon: categories.icon },
};

export const ideasRepo = {
  async findAll({ sort = 'newest', categorySlug, search, page = 1, limit = 20 }: ListOptions) {
    const offset = (page - 1) * limit;
    const filters = [];

    if (search) {
      filters.push(ilike(ideas.title, `%${search}%`));
    }
    if (categorySlug) {
      // Join on category slug
      filters.push(eq(categories.slug, categorySlug));
    }

    const orderBy =
      sort === 'votes'    ? desc(ideas.upvoteCount) :
      sort === 'trending' ? desc(sql`${ideas.upvoteCount}::float / power(extract(epoch from now() - ${ideas.createdAt}) / 3600 + 2, 1.5)`) :
                            desc(ideas.createdAt);

    const rows = await db
      .select(baseSelect)
      .from(ideas)
      .leftJoin(users, eq(ideas.authorId, users.id))
      .leftJoin(categories, eq(ideas.categoryId, categories.id))
      .where(and(...filters))
      .orderBy(orderBy)
      .limit(Math.min(limit, 50))
      .offset(offset);

    return { data: rows, meta: { page, pageSize: limit } };
  },

  async findById(id: string) {
    const [row] = await db
      .select(baseSelect)
      .from(ideas)
      .leftJoin(users, eq(ideas.authorId, users.id))
      .leftJoin(categories, eq(ideas.categoryId, categories.id))
      .where(eq(ideas.id, id))
      .limit(1);
    return row ?? null;
  },

  async create(data: { title: string; description: string; categoryId: string; authorId: string }) {
    const [idea] = await db.insert(ideas).values(data).returning();
    return idea;
  },

  async update(id: string, data: Partial<{ title: string; description: string; categoryId: string }>) {
    const [idea] = await db
      .update(ideas)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(ideas.id, id))
      .returning();
    return idea;
  },

  async deleteById(id: string) {
    await db.delete(ideas).where(eq(ideas.id, id));
  },
};