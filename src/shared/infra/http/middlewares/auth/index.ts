import { NextFunction, Request, Response } from 'express';

export const checkToken = (
  request: Request,
  response: Response,
  next: NextFunction,
) => {
  const token = request.headers.authorization;

  if (!token) {
    response.status(403).json({ message: 'Token can not be empty' });
  }

  next();
};
