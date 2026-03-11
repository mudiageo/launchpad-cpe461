import {
  pgTable, text, integer, timestamp, uuid, unique, index
} from 'drizzle-orm/pg-core';

// ── USERS (managed by better-auth, we extend it) ──────────────────
export const users = pgTable('users', {
  id:        uuid('id').primaryKey().defaultRandom(),
  email:     text('email').notNull().unique(),
  name:      text('name').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// ── CATEGORIES (seeded, not user-created) ─────────────────────────
export const categories = pgTable('categories', {
  id:   uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull().unique(),  // e.g. "FinTech", "HealthTech"
  slug: text('slug').notNull().unique(),  // e.g. "fintech" (for URL params)
  icon: text('icon'),                    // emoji or icon name
});

// ── IDEAS ─────────────────────────────────────────────────────────
export const ideas = pgTable('ideas', {
  id:          uuid('id').primaryKey().defaultRandom(),
  title:       text('title').notNull(),
  description: text('description').notNull(),
  authorId:    uuid('author_id')
                 .references(() => users.id, { onDelete: 'cascade' })
                 .notNull(),
  categoryId:  uuid('category_id')
                 .references(() => categories.id)
                 .notNull(),
  upvoteCount: integer('upvote_count').default(0).notNull(), // denormalized cache
  createdAt:   timestamp('created_at').defaultNow().notNull(),
  updatedAt:   timestamp('updated_at').defaultNow().notNull(),
}, (t) => ({
  authorIdx:   index('ideas_author_idx').on(t.authorId),
  categoryIdx: index('ideas_category_idx').on(t.categoryId),
  createdIdx:  index('ideas_created_idx').on(t.createdAt),
}));

// ── VOTES ─────────────────────────────────────────────────────────
export const votes = pgTable('votes', {
  id:        uuid('id').primaryKey().defaultRandom(),
  userId:    uuid('user_id')
               .references(() => users.id, { onDelete: 'cascade' })
               .notNull(),
  ideaId:    uuid('idea_id')
               .references(() => ideas.id, { onDelete: 'cascade' })
               .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  // THE KEY CONSTRAINT: database-level one-vote-per-user-per-idea
  uniqueVote: unique('unique_user_idea_vote').on(t.userId, t.ideaId),
}));

// ── COMMENTS ──────────────────────────────────────────────────────
export const comments = pgTable('comments', {
  id:        uuid('id').primaryKey().defaultRandom(),
  body:      text('body').notNull(),
  authorId:  uuid('author_id')
               .references(() => users.id, { onDelete: 'cascade' })
               .notNull(),
  ideaId:    uuid('idea_id')
               .references(() => ideas.id, { onDelete: 'cascade' })
               .notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => ({
  ideaIdx: index('comments_idea_idx').on(t.ideaId),
}));
