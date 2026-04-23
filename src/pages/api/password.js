const db = require('./db');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { masterKey, targetUsername, newPassword } = req.body;

  // 1. Verify the Master Key
  if (masterKey !== 'Pratheek@890') {
    return res.status(401).json({ success: false, error: 'Invalid Master Key. Access Denied.' });
  }

  // 2. Ensure fields are not empty
  if (!targetUsername || !newPassword) {
    return res.status(400).json({ success: false, error: 'Username and new password are required.' });
  }

  const client = await db.getClient();

  try {
    // 3. Update the password in the database
    const result = await client.query(
      'UPDATE users SET password = $1 WHERE username = $2 RETURNING id',
      [newPassword, targetUsername]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, error: 'User not found in the system.' });
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
