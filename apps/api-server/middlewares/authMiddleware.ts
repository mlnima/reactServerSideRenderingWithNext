import { decryptJWT } from '@repo/utils-server/dist/src';
import { Request, Response, NextFunction } from 'express';

export const verifySession = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies?.session;
    const session = await decryptJWT({ session: cookie });

    if (!session?._id) {
      req.auth = { isAuth: false };
      return next();
    }

    req.auth = {
      isAuth: true,
      userId: session._id,
      isAdmin: session?.role === 'administrator',
    };
  } catch (error) {
    console.log('verifySession error:', error);
    req.auth = { isAuth: false };
  }

  next();
};

export const verifyActionDelay = (req: Request, res: Response, next: NextFunction) => {
  try {
    const cookie = req.cookies?.lastAction;

    if (!cookie) {
      return next();
    }

    const lastActionTime = parseInt(cookie, 10);
    const currentTime = Date.now();

    if (currentTime - lastActionTime < 5000) {
      return res.status(429).json({ error: 'Too many requests — slow down' });
    }
  } catch {
    next();
  }

  next();
};
