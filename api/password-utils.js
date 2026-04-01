const crypto = require('crypto');

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `scrypt$${salt}$${hash}`;
}

function verifyPassword(password, storedPassword) {
  if (!storedPassword || typeof storedPassword !== 'string') return false;

  if (!storedPassword.startsWith('scrypt$')) {
    return storedPassword === password;
  }

  const [, salt, storedHash] = storedPassword.split('$');
  if (!salt || !storedHash) return false;

  const derivedHash = crypto.scryptSync(password, salt, 64).toString('hex');
  const storedBuffer = Buffer.from(storedHash, 'hex');
  const derivedBuffer = Buffer.from(derivedHash, 'hex');

  if (storedBuffer.length !== derivedBuffer.length) return false;
  return crypto.timingSafeEqual(storedBuffer, derivedBuffer);
}

module.exports = {
  hashPassword,
  verifyPassword
};
