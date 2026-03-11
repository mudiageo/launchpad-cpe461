import { Request, Response, NextFunction } from 'express';
import * as v from 'valibot';

export function validate<T>(schema: v.BaseSchema<T, any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = v.safeParse(schema, req.body);
    if (!result.success) {
      res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          issues: v.flatten(result.issues).nested,
        },
      });
      return;
    }
    req.body = result.output;
    next();
  };
}
