const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  const { action, username, amount, content, userId } = req.body;

  try {
    // 1. Get User Data (Wallet & Marquee)
    if (req.method === 'GET') {
      const user = await pool.query('SELECT * FROM users WHERE id = $1', [req.query.id]);
      const marquee = await pool.query('SELECT content FROM notifications LIMIT 1');
      return res.status(200).json({ user: user.rows[0], marquee: marquee.rows[0].content });
    }

    // 2. Admin: Add New User
    if (action === 'ADD_USER') {
      await pool.query('INSERT INTO users (username, password, wallet_balance) VALUES ($1, $2, 0)', [username, '123456']);
      return res.status(200).json({ success: true });
    }

    // 3. Admin: Credit/Debit (Moves money from Admin to User)
    if (action === 'TRANSFER') {
      // Deduct from Admin (User ID 1 is usually Admin)
      await pool.query('UPDATE users SET wallet_balance = wallet_balance - $1 WHERE role = $2', [amount, 'admin']);
      // Add to User
      await pool.query('UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2', [amount, userId]);
      // Record History
      await pool.query('INSERT INTO transactions (user_id, amount, description) VALUES ($1, $2, $3)', [userId, amount, 'Admin Transfer']);
      return res.status(200).json({ success: true });
    }

    // 4. Admin: Update Marquee
    if (action === 'UPDATE_NOTICE') {
      await pool.query('UPDATE notifications SET content = $1 WHERE id = 1', [content]);
      return res.status(200).json({ success: true });
    }

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
