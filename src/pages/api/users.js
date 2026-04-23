const db = require('./db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // List all non-admin users
    try {
      const result = await db.query("SELECT id, username, balance, role FROM users WHERE role = 'user' ORDER BY id DESC");
      res.status(200).json({ users: result.rows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
  
  else if (req.method === 'POST') {
    // Add a new user
    const { username, password } = req.body;
    try {
      const result = await db.query(
        "INSERT INTO users (username, password, balance, role) VALUES ($1, $2, 0, 'user') RETURNING id, username",
        [username, password]
      );
      res.status(201).json({ success: true, user: result.rows[0] });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
  
  else if (req.method === 'DELETE') {
    // Remove a user and refund balance to admin
    const { id } = req.query; 
    const client = await db.getClient();
    
    try {
      await client.query('BEGIN');
      
      const userRes = await client.query('SELECT balance FROM users WHERE id = $1', [id]);
      if (userRes.rows.length === 0) throw new Error('User not found');
      
      const refundAmount = userRes.rows[0].balance;
      
      // Admin is assumed to be ID 1
      await client.query('UPDATE users SET balance = balance + $1 WHERE id = 1', [refundAmount]);
      await client.query('DELETE FROM users WHERE id = $1', [id]);
      
      // Log the refund transaction
      if (refundAmount > 0) {
        await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Credit', $1, 1, 'Refund from deleted user')",
          [refundAmount]
        );
      }
      
      await client.query('COMMIT');
      res.status(200).json({ success: true, refunded: refundAmount });
    } catch (error) {
      await client.query('ROLLBACK');
      res.status(500).json({ error: error.message });
    } finally {
      client.release();
    }
  } 
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
