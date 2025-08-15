import crypto from 'crypto';
import { JWTPayload, SignJWT, jwtVerify } from 'jose';

interface IEncryptToJwt {
  payload?: JWTPayload;
  expiresIn?: string;
  customEncodeKey?: string;
}

export const encryptToJwt = async ({ payload, expiresIn = '30d', customEncodeKey }: IEncryptToJwt): Promise<string> => {
  const secretKey = customEncodeKey || process.env.JWT_KEY;
  const encodedKey = new TextEncoder().encode(secretKey);
  return new SignJWT(payload).setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime(expiresIn).sign(encodedKey);
};

interface IDecryptJWT {
  session?: string;
  customDecodeKey?: string;
}

export const decryptJWT = async ({ session = '', customDecodeKey }: IDecryptJWT) => {
  const secretKey = customDecodeKey || process.env.JWT_KEY;
  const decodedKey = new TextEncoder().encode(secretKey);

  try {
    const { payload } = await jwtVerify(session, decodedKey, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session');
  }
};

export const generateVideoToken = (videoPath, expiresIn = 3600000) => {
  const payload = {
    path: videoPath,
    expires: Date.now() + expiresIn,
    nonce: crypto.randomBytes(16).toString('hex'),
  };

  const secret = process.env.VIDEO_TOKEN_SECRET || 'your-secret-key';
  const token = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');

  return `${Buffer.from(JSON.stringify(payload)).toString('base64')}.${token}`;
};

export const verifyVideoToken = (token, requestedPath) => {
  try {
    const [payloadB64, signature] = token.split('.');
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64').toString());

    // Check expiration
    if (Date.now() > payload.expires) return false;

    // Check path
    if (payload.path !== requestedPath) return false;

    // Verify signature
    const secret = process.env.VIDEO_TOKEN_SECRET || 'your-secret-key';
    const expectedSignature = crypto.createHmac('sha256', secret).update(JSON.stringify(payload)).digest('hex');

    return signature === expectedSignature;
  } catch (err) {
    return false;
  }
};
