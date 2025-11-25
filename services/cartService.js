const pool = require('../config/database');

class CartService {
  async getUserCart(userId) {
    const result = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    return result.rows;
  }

  async addToCart(userId, product, quantity) {
    const existing = await pool.query(
      'SELECT * FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, product.id]
    );

    if (existing.rows.length > 0) {
      // Update quantity
      const result = await pool.query(
        `UPDATE cart_items 
         SET quantity = quantity + $1 
         WHERE user_id = $2 AND product_id = $3 
         RETURNING *`,
        [quantity, userId, product.id]
      );
      return result.rows[0];
    } else {
      // Insert new item
      const result = await pool.query(
        `INSERT INTO cart_items (user_id, product_id, product_name, price, quantity, folder, rating) 
         VALUES ($1, $2, $3, $4, $5, $6, $7) 
         RETURNING *`,
        [userId, product.id, product.name, product.price, quantity, product.folder, product.rating]
      );
      return result.rows[0];
    }
  }

  async updateCartItem(userId, productId, newQuantity) {
    if (newQuantity <= 0) {
      await pool.query(
        'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
        [userId, productId]
      );
      return null;
    }

    const result = await pool.query(
      `UPDATE cart_items 
       SET quantity = $1 
       WHERE user_id = $2 AND product_id = $3 
       RETURNING *`,
      [newQuantity, userId, productId]
    );

    return result.rows[0] || null;
  }

  async removeFromCart(userId, productId) {
    await pool.query(
      'DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    return true;
  }

  async clearCart(userId) {
    await pool.query('DELETE FROM cart_items WHERE user_id = $1', [userId]);
    return true;
  }
}

module.exports = new CartService();