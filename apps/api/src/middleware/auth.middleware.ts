import { Request, Response, NextFunction } from 'express';
import { auth } from '../lib/auth';
import { fromNodeHeaders } from 'better-auth/node';

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; email: string; name: string };
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });
  if (!session?.user) {
    res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'You must be logged in' },
    });
    return;
  }
  req.user = session.user as any;
  next();
}

export async function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
  if (session?.user) req.user = session.user as any;
  next();
}