const db = require('./db');
const { hashPassword, verifyPassword } = require('./password-utils');
const { getTokenFromRequest, verifyToken } = require('./auth');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const token = getTokenFromRequest(req);
  const authPayload = verifyToken(token);
  if (!authPayload || !authPayload.userId) {
    return res.status(401).json({ success: false, error: 'Unauthorized request.' });
  }

  const { oldPassword, newPassword, confirmNewPassword } = req.body || {};

  if (!oldPassword || !newPassword || !confirmNewPassword) {
    return res.status(400).json({ success: false, error: 'All fields are required.' });
  }

  if (newPassword.length < 8) {
    return res.status(400).json({ success: false, error: 'New password must be at least 8 characters.' });
  }

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ success: false, error: 'New passwords do not match.' });
  }

  try {
    const userResult = await db.query(
      'SELECT id, password FROM users WHERE id = $1',
      [authPayload.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'User not found.' });
    }

    const storedPassword = userResult.rows[0].password;
    if (!(await verifyPassword(oldPassword, storedPassword))) {
      return res.status(401).json({ success: false, error: 'Incorrect old password.' });
    }

    const newHashedPassword = await hashPassword(newPassword);
    await db.query('UPDATE users SET password = $1 WHERE id = $2', [newHashedPassword, authPayload.userId]);

    return res.status(200).json({ success: true, message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Pass reset error:', error);
    return res.status(500).json({ success: false, error: 'Unable to update password at the moment.' });
  }
}
