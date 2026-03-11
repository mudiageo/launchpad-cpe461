# 🚀 Launchpad

> An idea validation platform where users share, evaluate, and discover startup ideas within a structured community environment.

**CPE461 — Computer Engineering Project** · Built with the Spiral Process Model following Ian Sommerville's Software Engineering principles.

[![CI](https://github.com/mudiageo/launchpad-cpe461/actions/workflows/ci.yml/badge.svg)](https://github.com/mudiageo/launchpad-cpe461/actions)
[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen)](https://launchpad-cpe461.vercel.app)
[![API Docs](https://img.shields.io/badge/api-swagger-blue)](https://launchpad-cpe.onrender.com/api/docs)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Team](#team)
- [Engineering Decisions](#engineering-decisions)

---

## Overview

Launchpad is a full-stack web application built as a CPE461 group project. Users can submit startup ideas, upvote promising concepts, leave comments, filter by category, and explore trending submissions.

The project is structured as a **pnpm monorepo** with a SvelteKit frontend, an Express REST API backend, and a shared TypeScript package for types and validation schemas.

---

## Features

- **Authentication** — Register and login with email/password via better-auth
- **Ideas** — Submit, edit, and delete your own ideas with a title, description, and category
- **Voting** — One upvote per user per idea; toggle to remove your vote
- **Comments** — Post and delete comments on any idea
- **Categories** — Filter ideas by predefined categories (FinTech, EdTech, AgriTech, etc.)
- **Sorting** — Sort by Trending (time-decayed score), Newest, or Most Voted
- **Search** — Keyword search across idea titles
- **Responsive** — Fully usable on mobile, tablet, and desktop

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | SvelteKit 2 + Svelte 5 (runes) |
| Styling | Tailwind CSS 4 + shadcn-svelte |
| Server State | TanStack Query (Svelte) |
| Forms | TanStack Form + Valibot |
| Backend | Express 4 + TypeScript |
| ORM | Drizzle ORM |
| Database | PostgreSQL 16 |
| Auth | better-auth |
| Validation | Valibot (shared frontend + backend) |
| API Docs | Swagger / OpenAPI 3.0 |
| Package Manager | pnpm 9 (workspaces) |
| CI/CD | GitHub Actions |
| Frontend Host | Vercel |
| Backend Host | Railway |

---

## Architecture

This project follows a **Layered Architecture** (Sommerville, Ch. 6) across a monorepo:

```
Browser (SvelteKit SSR/SPA)
        ↕  HTTPS / REST JSON
Express API Server
  ├── Route Layer       → HTTP routing
  ├── Controller Layer  → Request/response handling
  ├── Service Layer     → Business logic (trending, vote-toggle)
  └── Repository Layer  → All database queries (Drizzle ORM)
        ↕  Drizzle ORM
PostgreSQL Database
```

**Key architectural decisions:**

- **Separate Express backend** rather than SvelteKit-only API routes — enables independent team ownership, cleaner Swagger documentation, and explicit better-auth integration. SvelteKit consuming an external REST API is a first-class recommended pattern.
- **pnpm workspaces monorepo** — `packages/shared` contains Valibot schemas and TypeScript types used by both frontend and backend, eliminating duplication.
- **DB-level vote uniqueness** — A `UNIQUE(user_id, idea_id)` constraint on the `votes` table enforces one-vote-per-user at the database level, not just application code (Sommerville reliability principle).
- **Denormalized upvote counter** — `ideas.upvote_count` is updated atomically alongside vote inserts/deletes for fast sorting, avoiding expensive `COUNT()` queries.

**Process Model: Spiral Model** (Boehm / Sommerville Ch. 2) — 5 daily increments, each with risk identification and resolution before development proceeds.

---

## Project Structure

```
launchpad-cpe461/
├── apps/
│   ├── web/                    # SvelteKit frontend
│   │   └── src/
│   │       ├── lib/
│   │       │   ├── components/ # IdeaCard, VoteButton, Navbar, etc.
│   │       │   ├── queries/    # TanStack Query hooks
│   │       │   ├── forms/      # TanStack Form instances
│   │       │   └── api-client.ts
│   │       └── routes/         # SvelteKit pages
│   │
│   └── api/                    # Express backend
│       └── src/
│           ├── db/             # Drizzle client, migrations, seed
│           ├── routes/         # Express routers (one per resource)
│           ├── controllers/    # HTTP request/response handlers
│           ├── services/       # Business logic
│           ├── repositories/   # Database queries
│           ├── middleware/      # Auth, validation, error handling
│           └── swagger/        # OpenAPI config
│
├── packages/
│   └── shared/                 # Shared TypeScript types + Valibot schemas
│
├── .github/workflows/ci.yml    # GitHub Actions CI
├── pnpm-workspace.yaml
└── package.json
```

---

## Getting Started

### Prerequisites

- [Node.js 20+](https://nodejs.org)
- [pnpm 9+](https://pnpm.io) — install with `npm install -g pnpm`
- [Git](https://git-scm.com)
- A PostgreSQL database (local or [Neon](https://neon.tech) free tier)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/mudiageo/launchpad-cpe461.git
cd launchpad-cpe461

# 2. Install all dependencies
pnpm install

# 3. Set up environment variables
cp apps/api/.env.example apps/api/.env
# Edit apps/api/.env and fill in your DATABASE_URL and BETTER_AUTH_SECRET

# 4. Run database migrations and seed data
pnpm db:migrate
pnpm db:seed

# 5. Start both dev servers (in two terminals)
# Terminal 1 — API (http://localhost:4000)
pnpm --filter @launchpad/api dev

# Terminal 2 — Web (http://localhost:5173)
pnpm --filter @launchpad/web dev
```

Or start everything in parallel from the root:

```bash
pnpm dev
```

> **API docs** available at [http://localhost:4000/api/docs](http://localhost:4000/api/docs) once the API is running.

---

## Environment Variables

### `apps/api/.env`

| Variable | Description | Example |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/launchpad` |
| `BETTER_AUTH_SECRET` | Random 32-char secret for session signing | `openssl rand -hex 32` |
| `FRONTEND_URL` | Allowed CORS origin | `http://localhost:5173` |
| `PORT` | Port the API listens on | `4000` |

### `apps/web/.env`

| Variable | Description | Example |
|---|---|---|
| `PUBLIC_API_URL` | Base URL of the Express API | `http://localhost:4000` |

> ⚠️ Never commit `.env` files. Only `.env.example` files are committed to the repo.

---

## Database

This project uses **PostgreSQL** with **Drizzle ORM** for type-safe queries and schema migrations.

### Schema Overview

| Table | Description |
|---|---|
| `users` | User accounts (managed by better-auth) |
| `categories` | Predefined idea categories (seeded) |
| `ideas` | Submitted ideas with denormalized `upvote_count` |
| `votes` | User votes — `UNIQUE(user_id, idea_id)` enforces one vote per user |
| `comments` | Comments on ideas |

### Useful Commands

```bash
# Generate migration files from schema changes
pnpm db:generate

# Apply pending migrations to the database
pnpm db:migrate

# Seed the database with initial categories
pnpm db:seed

# Open Drizzle Studio (visual DB browser)
pnpm --filter @launchpad/api db:studio
```

---

## API Reference

Full interactive documentation is available at `/api/docs` (Swagger UI).

**Base URL:** `http://localhost:4000/api/v1`

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/ideas` | List ideas (`?sort`, `?category`, `?search`, `?page`) | No |
| `POST` | `/ideas` | Submit a new idea | Yes |
| `GET` | `/ideas/:id` | Get a single idea | No |
| `PATCH` | `/ideas/:id` | Update your own idea | Yes |
| `DELETE` | `/ideas/:id` | Delete your own idea | Yes |
| `POST` | `/ideas/:id/vote` | Toggle upvote | Yes |
| `GET` | `/ideas/:id/comments` | List comments on an idea | No |
| `POST` | `/ideas/:id/comments` | Post a comment | Yes |
| `DELETE` | `/comments/:id` | Delete your own comment | Yes |
| `GET` | `/categories` | List all categories | No |
| `GET` | `/users/me` | Get current user profile | Yes |
| `POST` | `/auth/sign-up/email` | Register | No |
| `POST` | `/auth/sign-in/email` | Login | No |
| `POST` | `/auth/sign-out` | Logout | Yes |

### Response Format

All endpoints return a consistent envelope:

```json
// Success
{ "success": true, "data": { ... }, "meta": { "page": 1, "total": 42 } }

// Error
{ "success": false, "error": { "code": "UNAUTHORIZED", "message": "Authentication required" } }
```

---

## Deployment

| Service | Platform | URL |
|---|---|---|
| Frontend | Vercel | https://launchpad-cpe461.vercel.app |
| Backend API | Render | https://launchpad-cpe451-api.onrender.com |
| Database | Neon Serverless PostgreSQL | — |

### Deploy Frontend (Vercel)

1. Connect repo to Vercel → set **Root Directory** to `apps/web`
2. Add env var: `PUBLIC_API_URL=https://your-api.railway.app`
3. Deploy — Vercel auto-deploys on every push to `main`

### Deploy Backend (Render)

1. Connect repo to Render → set **Root Directory** to `apps/api`
2. Add env vars: `DATABASE_URL`, BETTER_AUTH_SECRET`, `FRONTEND_URL`, `NODE_ENV=production`
3. After first deploy, run: `pnpm db:migrate && pnpm db:seed`

---

## Team

| Name | Role | Department |
|---|---|---|
| - | Team Lead | — |
| — | Frontend Lead | Frontend |
| — | Backend Lead | Backend |
| — | DevOps Lead | DevOps & QA |
| *(fill in)* | *(fill in)* | *(fill in)* |

---

## Engineering Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Process Model | Spiral Model | Risk-driven, suits 5-day timeline and mixed skill levels |
| Architecture | Layered (Route/Controller/Service/Repository) | Separation of concerns (Sommerville Ch. 6) |
| Monorepo | pnpm workspaces | Share types/schemas between frontend and backend |
| Backend | Express (separate from SvelteKit) | Team ownership separation; cleaner Swagger integration |
| ORM | Drizzle | TypeScript-first; schema = single source of truth |
| Auth | better-auth | Modern session-based auth; Express middleware support |
| Validation | Valibot (shared) | Runs on both client and server from one schema definition |
| Vote integrity | DB UNIQUE constraint | Application code alone cannot guarantee atomicity |

---

> Built for CPE461 · Structured using Ian Sommerville's *Software Engineering* (9th Edition)