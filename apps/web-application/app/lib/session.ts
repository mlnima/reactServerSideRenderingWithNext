import 'server-only';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_KEY;
const encodedKey = new TextEncoder().encode(secretKey);

interface SessionPayload {
  _id: string,
  role?: string,
  expiresAt: Date
}

export async function encryptToJwt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30d')
    .sign(encodedKey);
}

export async function decryptJWT(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
}


export const createNewSession = async (_id: string, role: string) => {
  try {
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const cookieStore = await cookies();

    const session = await encryptToJwt({ _id,role, expiresAt });

    if (!session) return;

    cookieStore.set(
      'session',
      session,
      {
        secure: process.env.NODE_ENV === 'production',
        expires: expiresAt, // 30 days from now
      });

  } catch (error) {
    return;
  }

};

export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}