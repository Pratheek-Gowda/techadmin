const crypto = require('crypto');
const { promisify } = require('util');
const scrypt = promisify(crypto.scrypt);

function safeEqualStrings(a, b) {
  const valueA = String(a);
  const valueB = String(b);
  const maxLength = Math.max(valueA.length, valueB.length);
  const paddedA = valueA.padEnd(maxLength, '\0');
  const paddedB = valueB.padEnd(maxLength, '\0');
  return crypto.timingSafeEqual(Buffer.from(paddedA), Buffer.from(paddedB));
}

async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashBuffer = await scrypt(password, salt, 64);
  const hash = hashBuffer.toString('hex');
  return `scrypt$${salt}$${hash}`;
}

async function verifyPassword(password, storedPassword) {
  if (!storedPassword || typeof storedPassword !== 'string') return false;

  if (!storedPassword.startsWith('scrypt$')) {
    return safeEqualStrings(storedPassword, password);
  }

  const [, salt, storedHash] = storedPassword.split('$');
  if (!salt || !storedHash) return false;

  const derivedHashBuffer = await scrypt(password, salt, 64);
  const derivedHash = derivedHashBuffer.toString('hex');
  const storedBuffer = Buffer.from(storedHash, 'hex');
  const derivedBuffer = Buffer.from(derivedHash, 'hex');

  if (storedBuffer.length !== derivedBuffer.length) return false;
  return crypto.timingSafeEqual(storedBuffer, derivedBuffer);
}

module.exports = {
  hashPassword,
  verifyPassword
};
