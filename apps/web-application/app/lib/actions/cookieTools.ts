'use server';
import { cookies } from 'next/headers';
import { generateJwtToken } from '@lib/actions/database/tools';

interface IArg {
  name: string,
  value: string,
  expires?: number
}

export const cookieSetter = async ({ name, value, expires }: IArg) => {
  const cookieStore = await cookies();
  cookieStore.set(
    name,
    value,
    {
      secure: process.env.NODE_ENV === 'production',
      expires: expires || new Date(performance.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    });
};
// export const cookieGeter = async ({ name }: IArg) => {
//   return (await cookies()).get('session')?.value
// };

export const cookieChecker = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.has(name);
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
  return;
};


export const createNewSession = async (_id: string,role:string) => {
  try {
    const cookieStore = await cookies();

    const session = generateJwtToken({ _id,role });

    if (!session) return;

    cookieStore.set(
      'session',
      session,
      {
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(performance.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });

  } catch (error) {
    return;
  }

};
