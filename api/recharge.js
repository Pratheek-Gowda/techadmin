const db = require('./db');

export default async function handler(req, res) {
  const client = await db.getClient();

  try {
    if (req.method === 'GET') {
      const result = await client.query(`
        SELECT r.*, u.username 
        FROM recharge_requests r
        JOIN users u ON r.user_id = u.id
        WHERE r.status = 'pending'
        ORDER BY r.created_at ASC
      `);
      return res.status(200).json({ requests: result.rows });
    } 
    
    else if (req.method === 'POST') {
      const { userId, phone, planPrice, otfAmount, planDesc } = req.body;
      
      await client.query('BEGIN');
      
      const userRes = await client.query('SELECT balance FROM users WHERE id = $1 FOR UPDATE', [userId]);
      if(userRes.rows[0].balance < planPrice) {
          throw new Error("Insufficient wallet balance for this recharge plan.");
      }

      await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [planPrice, userId]);
      await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Debit', $1, $2, $3)",
          [planPrice, userId, `Recharge deduction for ${phone}`]
      );
      
      await client.query(
        "INSERT INTO recharge_requests (user_id, phone, plan_price, otf_amount, plan_desc) VALUES ($1, $2, $3, $4, $5)",
        [userId, phone, planPrice, otfAmount, planDesc]
      );

      await client.query('COMMIT');
      return res.status(201).json({ success: true });
    } 
    
    else if (req.method === 'PUT') {
      const { requestId, userId, planPrice, otfAmount, action, adminNote } = req.body;
      
      await client.query('BEGIN');

      await client.query("UPDATE recharge_requests SET status = $1 WHERE id = $2", [action, requestId]);

      if (action === 'approve') {
        // LOGIC CHANGED HERE: Admin is no longer deducted. Only User is credited the cashback.
        await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [otfAmount, userId]); 
        
        await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Credit', $1, $2, $3)",
          [otfAmount, userId, adminNote || 'Cashback for successful recharge']
        );
      } else if (action === 'reject') {
        await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [planPrice, userId]);
        await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Credit', $1, $2, $3)",
          [planPrice, userId, adminNote || 'Refund for failed mobile recharge']
        );
      }

      await client.query('COMMIT');
      return res.status(200).json({ success: true });
    }

  } catch (error) {
    await client.query('ROLLBACK');
    return res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
}
