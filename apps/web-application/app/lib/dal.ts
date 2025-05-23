import 'server-only';
import { cache } from 'react';
import { cookies } from 'next/headers';
import { decryptJWT } from './session';

export type TVerifySession = { isAuth?: boolean; userId?: any; isAdmin?: boolean; }

export const verifySession = cache(async (): Promise<TVerifySession> => {
  try {
    const cookie = (await cookies()).get('session')?.value;
    const session = await decryptJWT(cookie);

    if (!session?._id) {
      return {
        isAuth: false,
      };
    }

    return {
      isAuth: !!session?._id,
      userId: session._id,
      isAdmin: session?.role === 'administrator',
    };
  } catch (error) {
    console.log(`verifySession error: `, error);
    return {
      isAuth: false,
    };
  }

});

export const verifyActionDelay = cache(async (): Promise<boolean> => {
  try {
    const cookie = (await cookies()).get('lastAction')?.value;

    if (!cookie) {
      return false;
    }

    const lastActionTime = parseInt(cookie, 10);
    const currentTime = Date.now();

    return currentTime - lastActionTime < 10000;
  } catch (error) {
    return false;
  }
});

