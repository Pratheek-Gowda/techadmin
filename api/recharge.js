const db = require('./db');

export default async function handler(req, res) {
  const client = await db.getClient();

  try {
    if (req.method === 'GET') {
      // Admin fetching pending recharge requests
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
      // User asking for recharge
      const { userId, phone, planPrice, otfAmount, planDesc } = req.body;
      
      await client.query('BEGIN');
      
      // 1. Verify user has enough balance
      const userRes = await client.query('SELECT balance FROM users WHERE id = $1 FOR UPDATE', [userId]);
      if(userRes.rows[0].balance < planPrice) {
          throw new Error("Insufficient wallet balance for this recharge plan.");
      }

      // 2. Deduct immediately from user
      await client.query('UPDATE users SET balance = balance - $1 WHERE id = $2', [planPrice, userId]);
      await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Debit', $1, $2, $3)",
          [planPrice, userId, `Recharge deduction for ${phone} (${planDesc})`]
      );
      
      // 3. Log the request for Admin
      await client.query(
        "INSERT INTO recharge_requests (user_id, phone, plan_price, otf_amount, plan_desc) VALUES ($1, $2, $3, $4, $5)",
        [userId, phone, planPrice, otfAmount, planDesc]
      );

      await client.query('COMMIT');
      return res.status(201).json({ success: true });
    } 
    
    else if (req.method === 'PUT') {
      // Admin processing the recharge
      const { requestId, userId, planPrice, otfAmount, action } = req.body;
      
      await client.query('BEGIN');

      // Mark request as processed
      await client.query("UPDATE recharge_requests SET status = $1 WHERE id = $2", [action, requestId]);

      if (action === 'approve') {
        // Recharge successful -> Give user the OTF commission
        await client.query('UPDATE users SET balance = balance - $1 WHERE id = 1', [otfAmount]); // Deduct OTF from Admin
        await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [otfAmount, userId]); // Give OTF to User
        
        await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Credit', $1, $2, 'OTF Commission for successful recharge')",
          [otfAmount, userId]
        );
      } else if (action === 'reject') {
        // Recharge failed -> Refund the original plan price back to the user
        await client.query('UPDATE users SET balance = balance + $1 WHERE id = $2', [planPrice, userId]);
        await client.query(
          "INSERT INTO transactions (type, amount, user_id, description) VALUES ('Credit', $1, $2, 'Refund for failed mobile recharge')",
          [planPrice, userId]
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
