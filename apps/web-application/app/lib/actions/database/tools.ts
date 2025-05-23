
import jwt from 'jsonwebtoken';

export const generateJwtToken = (tokenData: object): string | undefined => {
  if (!process.env.JWT_KEY) return;
  return jwt.sign(tokenData, process.env.JWT_KEY || 'defaultKey', {
    expiresIn: '365 days',
  });
};



