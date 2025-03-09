import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { decryptJWT } from './session';

export type TVerifySession = { isAuth?: boolean; userId?: any; isAdmin?: boolean; }

export const verifySession = cache(async (): Promise<TVerifySession> => {
  const cookie = (await cookies()).get('session')?.value;
  const session = await decryptJWT(cookie);

  return {
    isAuth: !!session?._id,
    userId: session._id,
    isAdmin: session?.role === 'administrator',
  };
});

