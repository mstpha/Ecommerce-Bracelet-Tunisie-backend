const pool = require('../config/database');

class FavoriteService {
  async getUserFavorites(userId) {
    const result = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 ORDER BY added_at DESC',
      [userId]
    );
    return result.rows;
  }

  async addToFavorites(userId, product) {
    // Check if already favorited
    const existing = await pool.query(
      'SELECT * FROM favorites WHERE user_id = $1 AND product_id = $2',
      [userId, product.id]
    );

    if (existing.rows.length > 0) {
      throw new Error('Product already in favorites');
    }

    const result = await pool.query(
      `INSERT INTO favorites (user_id, product_id, product_name, price, rating, folder) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING *`,
      [userId, product.id, product.name, product.price, product.rating, product.folder]
    );

    return result.rows[0];
  }

  async removeFromFavorites(userId, productId) {
    await pool.query(
      'DELETE FROM favorites WHERE user_id = $1 AND product_id = $2',
      [userId, productId]
    );
    return true;
  }
}

module.exports = new FavoriteService();