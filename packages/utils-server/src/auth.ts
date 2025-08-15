import crypto from 'crypto';

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
