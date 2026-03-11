import { ErrorRequestHandler } from 'express';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  if (err.code === '23505') {
    res.status(409).json({ success: false, error: { code: 'DUPLICATE', message: 'Already exists' } });
    return;
  }
  const status = err.statusCode || err.status || 500;
  res.status(status).json({
    success: false,
    error: { code: err.code || 'SERVER_ERROR', message: err.message || 'Internal server error' },
  });
};
