const db = require('./db');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    // Get master wallet balance, transactions, and marquee text
    try {
      const adminRes = await db.query('SELECT balance FROM users WHERE id = 1');
      const marqueeRes = await db.query("SELECT value FROM system_settings WHERE key = 'marquee_text'");
      
      // Fetch recent transactions
      const txRes = await db.query(`
        SELECT t.id, t.type, t.amount, t.description, t.created_at, u.username as user
        FROM transactions t
        LEFT JOIN users u ON t.user_id = u.id
        ORDER BY t.created_at DESC LIMIT 50
      `);

      res.status(200).json({ 
        adminWallet: adminRes.rows[0]?.balance || 0,
        marqueeText: marqueeRes.rows[0]?.value || 'Welcome to the portal.',
        transactions: txRes.rows
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
  
  else if (req.method === 'POST') {
    // Update marquee text
    const { marqueeText } = req.body;
    try {
      await db.query(
        "INSERT INTO system_settings (key, value) VALUES ('marquee_text', $1) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
        [marqueeText]
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
  
  else if (req.method === 'PUT') {
    // Add/Remove money from the master admin wallet manually
    const { amount, action } = req.body; 
    const numAmount = parseFloat(amount);

    try {
      if (action === 'add') {
        await db.query('UPDATE users SET balance = balance + $1 WHERE id = 1', [numAmount]);
      } else if (action === 'remove') {
        await db.query('UPDATE users SET balance = balance - $1 WHERE id = 1', [numAmount]);
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } 
  
  else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
