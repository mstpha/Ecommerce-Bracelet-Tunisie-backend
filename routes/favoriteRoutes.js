const express = require('express');
const router = express.Router();
const favoriteService = require('../services/favoriteService');

// Get user's favorites
router.get('/:userId', async (req, res) => {
  try {
    const favorites = await favoriteService.getUserFavorites(req.params.userId);
    res.json({ success: true, data: favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to favorites
router.post('/:userId', async (req, res) => {
  try {
    const { product } = req.body;
    const favorite = await favoriteService.addToFavorites(req.params.userId, product);
    res.status(201).json({ success: true, data: favorite });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Remove from favorites
router.delete('/:userId/:productId', async (req, res) => {
  try {
    await favoriteService.removeFromFavorites(req.params.userId, req.params.productId);
    res.json({ success: true, message: 'Removed from favorites' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;