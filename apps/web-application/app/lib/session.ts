import 'server-only';
import { cookies } from 'next/headers';
import { encryptToJwt } from '@repo/utils-server';

export const createNewSession = async (_id: string, role: string) => {
  try {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    const session = await encryptToJwt({ payload: { _id, role, expiresAt } });
    if (!session) return;

    cookieStore.set('session', session, {
      secure: process.env.NODE_ENV === 'production',
      expires: expiresAt, // 30 days from now
    });
  } catch (error) {
    console.log(`createNewSession Error=> `, error);
    return;
  }
};

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}
