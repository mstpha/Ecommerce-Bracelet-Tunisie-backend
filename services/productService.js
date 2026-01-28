const pool = require('../config/database');

class ProductService {
  async getAllProducts() {
    const result = await pool.query(
      'SELECT * FROM products ORDER BY id ASC'
    );
    return result.rows;
  }

  async getProductById(productId) {
    const result = await pool.query(
      'SELECT * FROM products WHERE id = $1',
      [productId]
    );

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    return result.rows[0];
  }

  async addProduct(productData) {
    const {
      name,
      description,
      imageCount,
      gender,
      folder,
      rating,
      price,
      category,
      availability,
      characteristics
    } = productData;

    const result = await pool.query(
      `INSERT INTO products 
       (name, description, image_count, gender, folder, rating, price, category, availability, characteristics) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING *`,
      [
        name,
        description,
        imageCount,
        gender,
        folder,
        rating,
        price,
        category,
        availability,
        JSON.stringify(characteristics)
      ]
    );

    return result.rows[0];
  }

  async updateProduct(productId, productData) {
    const {
      name,
      description,
      imageCount,
      gender,
      folder,
      rating,
      price,
      category,
      availability,
      characteristics
    } = productData;

    const result = await pool.query(
      `UPDATE products 
       SET name = $1, description = $2, image_count = $3, gender = $4, 
           folder = $5, rating = $6, price = $7, category = $8, 
           availability = $9, characteristics = $10 
       WHERE id = $11 
       RETURNING *`,
      [
        name,
        description,
        imageCount,
        gender,
        folder,
        rating,
        price,
        category,
        availability,
        JSON.stringify(characteristics),
        productId
      ]
    );

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    return result.rows[0];
  }

  async deleteProduct(productId) {
    const result = await pool.query(
      'DELETE FROM products WHERE id = $1 RETURNING *',
      [productId]
    );

    if (result.rows.length === 0) {
      throw new Error('Product not found');
    }

    return true;
  }

  async getProductsByCategory(category) {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 ORDER BY id ASC',
      [category]
    );
    return result.rows;
  }

  async getProductsByGender(gender) {
    const result = await pool.query(
      'SELECT * FROM products WHERE gender = $1 ORDER BY id ASC',
      [gender]
    );
    return result.rows;
  }
}

module.exports = new ProductService();