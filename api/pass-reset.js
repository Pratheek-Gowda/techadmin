const db = require('./db');
const { hashPassword, verifyPassword } = require('./password-utils');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, username, oldPassword, newPassword, confirmNewPassword } = req.body || {};

  if (!userId || !username || !oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, error: 'New password must be at least 8 characters.' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ success: false, error: 'New passwords do not match.' });
  }

  const client = await db.getClient();

  try {
    const userResult = await client.query(
      'SELECT id, password FROM users WHERE id = $1 AND username = $2',
      [userId, username]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const storedPassword = userResult.rows[0].password;
    if (!verifyPassword(oldPassword, storedPassword)) {
      return res.status(401).json({ success: false, error: 'Incorrect old password.' });
    }

    const newHashedPassword = hashPassword(newPassword);
    await client.query('UPDATE users SET password = $1 WHERE id = $2', [newHashedPassword, userId]);

    return res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  } finally {
    client.release();
  }
}
