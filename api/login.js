const db = require('./db');
const { verifyPassword } = require('./password-utils');

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

    if (result.rows.length === 0 || !verifyPassword(password, result.rows[0].password)) {
      res.status(401).json({ success: false, error: 'Invalid credentials' });
      return;
    }

    const { id, username: name, balance, role } = result.rows[0];
    res.status(200).json({ success: true, user: { id, username: name, balance, role } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
