const crypto = require('crypto');
const TOKEN_EXPIRY_HOURS = 8;
const TOKEN_TTL_SECONDS = 60 * 60 * TOKEN_EXPIRY_HOURS;

function getAuthSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error('AUTH_SECRET must be set');
  }
  return secret;
}

function base64UrlEncode(value) {
  return Buffer.from(value).toString('base64url');
}

function base64UrlDecode(value) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

function signToken(payload) {
  const now = Math.floor(Date.now() / 1000);
  const body = { ...payload, exp: now + TOKEN_TTL_SECONDS };
  const encodedPayload = base64UrlEncode(JSON.stringify(body));
  const signature = crypto
    .createHmac('sha256', getAuthSecret())
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

function verifyToken(token) {
  if (!token || typeof token !== 'string' || !token.includes('.')) return null;
  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return null;

  const expectedSignature = crypto
    .createHmac('sha256', getAuthSecret())
    .update(encodedPayload)
    .digest('base64url');

  const expectedBuffer = Buffer.from(expectedSignature);
  const signatureBuffer = Buffer.from(signature);
  if (expectedBuffer.length !== signatureBuffer.length) return null;
  if (!crypto.timingSafeEqual(expectedBuffer, signatureBuffer)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (!payload.exp || payload.exp < now) return null;
    return payload;
  } catch (_error) {
    return null;
  }
}

function getTokenFromRequest(req) {
  const authHeader = req.headers?.authorization || req.headers?.Authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice(7).trim();
}

module.exports = {
  signToken,
  verifyToken,
  getTokenFromRequest
};
