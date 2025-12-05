const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const { authenticate, authorizeUser } = require('../middleware/auth');

// Public routes (no authentication needed)

// Register new user - returns token
router.post('/', async (req, res) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error('❌ Full error object:', error);
    console.error('❌ Error message:', error.message);
    console.error('❌ Error stack:', error.stack);
    res.status(400).json({ 
      success: false, 
      message: error.message || error.toString() || 'Unknown error occurred'
    });
  }
});

// Login - returns token
router.post('/login', async (req, res) => {
  try {
    const result = await userService.loginUser(req.body.email, req.body.password);
    res.json({ success: true, data: result });
  } catch (error) {
    res.status(401).json({ success: false, message: error.message });
  }
});

// Protected routes (authentication required)

// Get all users - admin only (you might want to add role-based auth later)
router.get('/', authenticate, async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get user by ID - user can only get their own data
router.get('/:id', authenticate, authorizeUser, async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update user - user can only update their own data
router.put('/:id', authenticate, authorizeUser, async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Delete user - user can only delete their own account
router.delete('/:id', authenticate, authorizeUser, async (req, res) => {
  try {
    await userService.deleteUser(req.params.id);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;