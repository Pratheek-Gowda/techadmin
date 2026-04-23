const db = require('./db');

export default async function handler(req, res) {
  const client = await db.getClient();

  try {
    if (req.method === 'GET') {
      // Admin fetching pending requests
      const result = await client.query(`
        SELECT r.id, r.amount, r.created_at, u.username, u.id as user_id 
        FROM fund_requests r
        JOIN users u ON r.user_id = u.id
        WHERE r.status = 'pending'
        ORDER BY r.created_at ASC
      `);
      return res.status(200).json({ requests: result.rows });
    } 
    
    else if (req.method === 'POST') {
      // User asking for funds
      const { userId, amount } = req.body;
      await client.query(
        "INSERT INTO fund_requests (user_id, amount) VALUES ($1, $2)",
        [userId, amount]
      );
      return res.status(201).json({ success: true });
    } 
    
    else if (req.method === 'PUT') {
      // Admin approving or rejecting a request
      const { requestId, action, userId, amount } = req.body; // action = 'approve' or 'reject'
      
      await client.query('BEGIN');

      // Mark request as completed (approved or rejected)
      await client.query("UPDATE fund_requests SET status = $1 WHERE id = $2", [action, requestId]);

      if (action === 'approve') {
        // Check if admin has enough money
        const adminRes = await client.query('SELECT balance FROM users WHERE id = 1');
        if (adminRes.rows[0].balance < amount) throw new Error('Insufficient Admin Wallet balance');

        // Move the money
        await client.query('UPDATE users SET balance = balance - $1 WHERE id = 1', [amount]);
        await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [amount, userId]);
        
        // Log it in history
        await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Credit', $1, $2, 'Approved Fund Request')",
          [amount, userId]
        );
      }

      await client.query('COMMIT');
      return res.status(200).json({ success: true });
    } else {
        return res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
