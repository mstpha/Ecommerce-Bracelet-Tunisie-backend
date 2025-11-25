const pool = require('../config/database');

class ReviewService {
  async getProductReviews(productId) {
    const result = await pool.query(
      'SELECT * FROM reviews WHERE product_id = $1 ORDER BY created_at DESC',
      [productId]
    );
    return result.rows;
  }

  async addReview(productId, userName, reviewMessage) {
    if (!productId || !userName || !reviewMessage) {
      throw new Error('Product ID, user name, and review message are required');
    }

    const result = await pool.query(
      `INSERT INTO reviews (product_id, user_name, review_message) 
       VALUES ($1, $2, $3) 
       RETURNING *`,
      [productId, userName.trim(), reviewMessage.trim()]
    );

    return result.rows[0];
  }
}

module.exports = new ReviewService();