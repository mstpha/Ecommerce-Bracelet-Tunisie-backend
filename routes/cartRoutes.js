const express = require('express');
const router = express.Router();
const cartService = require('../services/cartService');

// Get user's cart
router.get('/:userId', async (req, res) => {
  try {
    const cartItems = await cartService.getUserCart(req.params.userId);
    res.json({ success: true, data: cartItems });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add to cart
router.post('/:userId', async (req, res) => {
  try {
    const { product, quantity } = req.body;
    const cartItem = await cartService.addToCart(req.params.userId, product, quantity);
    res.json({ success: true, data: cartItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Update cart item
router.put('/:userId/:productId', async (req, res) => {
  try {
    const { quantity } = req.body;
    const cartItem = await cartService.updateCartItem(req.params.userId, req.params.productId, quantity);
    res.json({ success: true, data: cartItem });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Remove from cart
router.delete('/:userId/:productId', async (req, res) => {
  try {
    await cartService.removeFromCart(req.params.userId, req.params.productId);
    res.json({ success: true, message: 'Item removed from cart' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Clear cart
router.delete('/:userId', async (req, res) => {
  try {
    await cartService.clearCart(req.params.userId);
    res.json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;