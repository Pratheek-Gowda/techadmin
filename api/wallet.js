const db = require('./db');

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // action must be 'Credit' or 'Debit'
  const { userId, amount, action, description } = req.body;
  const numAmount = parseFloat(amount);
  
  if (!numAmount || numAmount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
  }

  const client = await db.getClient();

  try {
    await client.query('BEGIN');

    if (action === 'Credit') {
      // Check admin balance (id = 1)
      const adminRes = await client.query('SELECT balance FROM users WHERE id = 1');
      if (adminRes.rows[0].balance < numAmount) throw new Error('Insufficient admin funds');

      // Transfer funds
      await client.query('UPDATE users SET balance = balance - $1 WHERE id = 1', [numAmount]);
      await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [numAmount, userId]);
      
    } else if (action === 'Debit') {
      // Check user balance
      const userRes = await client.query('SELECT balance FROM users WHERE id = $1', [userId]);
      if (userRes.rows[0].balance < numAmount) throw new Error('Insufficient user funds');

      // Transfer funds back to admin
      await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [numAmount, userId]);
      await client.query('UPDATE users SET balance = balance + $1 WHERE id = 1', [numAmount]);
    }

    // Record transaction
    await client.query(
      'INSERT INTO transactions (type, amount, user_id, description) VALUES ($1, $2, $3, $4)',
      [action, numAmount, userId, description || `Admin ${action}`]
    );

    await client.query('COMMIT');
    res.status(200).json({ success: true });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
