import { Request, Response } from 'express';
import * as process from 'node:process';
import { verifyVideoToken } from '@repo/utils-server';

const videoStreamVerifyMiddleware = (req: Request, res: Response, next) => {
  const allowedExternalDomains = process.env.ALLOWED_VIDEO_FETCHING_FROM || '';

  const allowedDomains = [process.env.NEXT_PUBLIC_PRODUCTION_URL, ...allowedExternalDomains.split(',')].filter(Boolean);
  const referer = req.headers.referer || req.headers.referrer;
  const origin = req.headers.origin;
  const token = req.query.token;

  // console.log('\x1b[33m%s\x1b[0m', 'origin => ', origin);
  // console.log('\x1b[33m%s\x1b[0m', 'referer => ', referer);
  // console.log('\x1b[33m%s\x1b[0m', 'token => ', token);

  if (token && verifyVideoToken(token, req.url)) {
    next();
  } else {
    const isAllowed = allowedDomains.some((domain) => {
      return (referer && referer.includes(domain)) || (origin && origin === domain.replace(/\/$/, ''));
    });

    if (!isAllowed) {
      return res.status(403).send('Access denied');
    }
    next();
  }
};

export default videoStreamVerifyMiddleware;
