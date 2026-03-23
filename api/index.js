const { Pool } = require('pg');

// Initialize the pool outside the handler for better performance
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

export default async function handler(req, res) {
  // 1. Handle CORS (Allow the frontend to talk to the backend)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // 2. GET Request (Loading Data)
    if (req.method === 'GET') {
      const { id } = req.query;
      const userResult = await pool.query('SELECT * FROM users WHERE id = $1', [id || 1]);
      const marqueeResult = await pool.query('SELECT content FROM notifications LIMIT 1');
      
      return res.status(200).json({ 
        user: userResult.rows[0] || { wallet_balance: 0 }, 
        marquee: marqueeResult.rows[0]?.content || "Welcome!" 
      });
    }

    // 3. POST Request (Admin/User Actions)
    if (req.method === 'POST') {
      const { action, userId, amount, content, username, password } = req.body;

      if (action === 'UPDATE_MARQUEE') {
        await pool.query('UPDATE notifications SET content = $1 WHERE id = 1', [content]);
        return res.status(200).json({ success: true });
      }

      if (action === 'MANAGE_FUNDS') {
        await pool.query('UPDATE users SET wallet_balance = wallet_balance + $1 WHERE id = $2', [amount, userId]);
        return res.status(200).json({ success: true });
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
