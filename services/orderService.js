const pool = require('../config/database');

class OrderService {
  async getUserOrders(userId) {
    const result = await pool.query(
      'SELECT * FROM orders WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async addOrder(userId, order) {
    const result = await pool.query(
      `INSERT INTO orders (user_id, product_id, product_name, quantity, price, total, display_string) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [
        userId,
        order.productId,
        order.product_name,
        order.quantity,
        order.price,
        order.total || (order.price * order.quantity),
        order.displayString || ''
      ]
    );
    return result.rows[0];
  }

  async addCartOrders(userId, cartItems, itemsList = '') {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const orders = [];
      for (const item of cartItems) {
        const result = await client.query(
          `INSERT INTO orders (user_id, product_id, product_name, quantity, price, total, display_string) 
           VALUES ($1, $2, $3, $4, $5, $6, $7) 
           RETURNING *`,
          [
            userId,
            item.productId || item.id,
            item.name,
            item.quantity,
            item.price,
            item.price * item.quantity,
            itemsList
          ]
        );
        orders.push(result.rows[0]);
      }

      await client.query('COMMIT');
      return orders;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = new OrderService();