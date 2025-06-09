import jwt from 'jsonwebtoken';

export const jwtValidator = async (token: string) => {
  try {
    return jwt.verify(token, process.env.JWT_KEY as string);
  } catch (error) {
    console.log(`jwtValidator Error=> `,error)
    return null;
  }
};