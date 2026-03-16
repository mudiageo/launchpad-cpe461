import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger/config';
import { errorHandler } from './middleware/error.middleware';
import { categoriesRouter } from './routes/categories';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { ideasRouter }      from './routes/ideas.router';
import { commentsRouter }   from './routes/comments.router';
import { votesRouter }      from './routes/votes.router';
import { usersRouter }      from './routes/users.router';


export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }));
  app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
  app.use(express.json({ limit: '10kb' }));

  app.use('/api/v1/categories', categoriesRouter);
  // app.use('/api/v1/ideas', ideasRouter);
  app.all('/api/auth/*', toNodeHandler(auth));
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api/v1/ideas',      ideasRouter);
app.use('/api/v1/ideas',      commentsRouter);  // handles /:ideaId/comments
app.use('/api/v1/ideas',      votesRouter);     // handles /:ideaId/vote
app.use('/api/v1/comments',   commentsRouter);  // handles DELETE /comments/:id
app.use('/api/v1/categories', categoriesRouter);
app.use('/api/v1/users',      usersRouter);
  app.use(errorHandler);

  return app;
}
