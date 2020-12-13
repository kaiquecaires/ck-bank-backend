import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { TokenProvider } from '../providers/TokenProvider/implementations/TokenProvider';

export async function auth (req: Request, res:Response, next: NextFunction) {
  const tokenProvider = new TokenProvider();

  if(!req.headers.authorization) {
    res.send(new AppError('Missing JWT Token'));
    return;
  }

  const token = req.headers.authorization.split(' ')[1];
  const id = await tokenProvider.validateToken(token);

  if(!id) {
    res.send(new AppError('Invalid JWT Token'));
    return;
  }

  req.user = {
    id,
  };

  next();
}
