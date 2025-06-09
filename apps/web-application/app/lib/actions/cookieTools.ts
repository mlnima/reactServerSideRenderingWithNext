'use server';
import { cookies } from 'next/headers';

interface IArg {
  name: string,
  value: string,
  expires?: number
}

export const cookieSetter = async ({ name, value, expires }: IArg) => {
  try {
    const cookieStore = await cookies();

    cookieStore.set(
      name,
      value,
      {
        secure: process.env.NODE_ENV === 'production',
        expires: expires || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      });

  }catch (error){
    console.log(`cookieSetter Error=> `,error)
  }
};


export const cookieChecker = async (name: string) => {
  const cookieStore = await cookies();
  return cookieStore.has(name);
};

export const deleteCookie = async (name: string) => {
  const cookieStore = await cookies();
  cookieStore.delete(name);
  return;
};



