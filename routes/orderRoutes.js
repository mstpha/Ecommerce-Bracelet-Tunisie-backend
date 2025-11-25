const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

// Get user's orders
router.get('/:userId', async (req, res) => {
  try {
    const orders = await orderService.getUserOrders(req.params.userId);
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add single order
router.post('/:userId', async (req, res) => {
  try {
    const order = await orderService.addOrder(req.params.userId, req.body);
    res.status(201).json({ success: true, data: order });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// Add cart orders (checkout)
router.post('/:userId/checkout', async (req, res) => {
  try {
    const { cartItems, itemsList } = req.body;
    const orders = await orderService.addCartOrders(req.params.userId, cartItems, itemsList);
    res.status(201).json({ success: true, data: orders });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;