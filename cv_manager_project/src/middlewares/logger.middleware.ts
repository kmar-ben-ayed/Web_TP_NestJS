import { Request, Response } from 'express';

export function logger(req: Request, res: Response, next: () => void) {
  console.log(`[Logger] ${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
}
