const db = require('./db');
const { verifyPassword, hashPassword } = require('./password-utils');
const { signToken } = require('./auth');
const DUMMY_PASSWORD_HASH_PROMISE = hashPassword('__invalid_user_placeholder__');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { username, password } = req.body;

  try {
    const result = await db.query(
      'SELECT id, username, balance, role, password FROM users WHERE username = $1',
      [username]
    );

    const fallbackPasswordHash = await DUMMY_PASSWORD_HASH_PROMISE;
    const userRecord = result.rows[0];
    const passwordToCheck = userRecord ? userRecord.password : fallbackPasswordHash;
    const isValidPassword = await verifyPassword(password, passwordToCheck);

    if (!userRecord || !isValidPassword) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const { id, username: name, balance, role } = userRecord;
    const token = signToken({ userId: id, username: name, role });
    res.status(200).json({ success: true, user: { id, username: name, balance, role }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
