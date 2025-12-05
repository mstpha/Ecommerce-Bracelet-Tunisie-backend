const pool = require('../config/database');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const { generateToken } = require('../middleware/auth');

class UserService {
  async getAllUsers() {
    const result = await pool.query('SELECT id, full_name, email, phone, address, created_at FROM users');
    return result.rows;
  }

  async getUserById(userId) {
    const result = await pool.query(
      'SELECT id, full_name, email, phone, address, created_at FROM users WHERE id = $1',
      [userId]
    );
    return result.rows[0] || null;
  }

  async getUserByEmail(email) {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async createUser(userData) {
    const existingUser = await this.getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const userId = uuidv4();

    const result = await pool.query(
      `INSERT INTO users (id, full_name, email, password, phone, address) 
       VALUES ($1, $2, $3, $4, $5, $6) 
       RETURNING id, full_name, email, phone, address, created_at`,
      [userId, userData.full_name, userData.email, hashedPassword, userData.phone || '', userData.address || '']
    );

    const user = result.rows[0];
    const token = generateToken(user);

    return {
      user,
      token
    };
  }

  async updateUser(userId, updates) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }
    
    if (updates.email && updates.email !== user.email) {
      const emailExists = await this.getUserByEmail(updates.email);
      if (emailExists) {
        throw new Error('Email already exists');
      }
    }

    const fields = [];
    const values = [];
    let paramCount = 1;

    if (updates.full_name) {
      fields.push(`full_name = $${paramCount++}`);
      values.push(updates.full_name);
    }
    if (updates.email) {
      fields.push(`email = $${paramCount++}`);
      values.push(updates.email);
    }
    if (updates.phone !== undefined) {
      fields.push(`phone = $${paramCount++}`);
      values.push(updates.phone);
    }
    if (updates.address !== undefined) {
      fields.push(`address = $${paramCount++}`);
      values.push(updates.address);
    }
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      fields.push(`password = $${paramCount++}`);
      values.push(hashedPassword);
    }

    if (fields.length === 0) {
      return user;
    }

    values.push(userId);

    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')} 
       WHERE id = $${paramCount} 
       RETURNING id, full_name, email, phone, address, created_at`,
      values
    );

    return result.rows[0];
  }

  async deleteUser(userId) {
    const user = await this.getUserById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await pool.query('DELETE FROM users WHERE id = $1', [userId]);
    return true;
  }

  async loginUser(email, password) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      throw new Error('Invalid email or password');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid email or password');
    }
    const { password: _, ...userWithoutPassword } = user;
    const token = generateToken(userWithoutPassword);

    return {
      user: userWithoutPassword,
      token
    };
  }
}

module.exports = new UserService();