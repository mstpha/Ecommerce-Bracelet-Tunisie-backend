const express = require('express');
const router = express.Router();
const reviewService = require('../services/reviewService');

// Get product reviews
router.get('/:productId', async (req, res) => {
  try {
    const reviews = await reviewService.getProductReviews(req.params.productId);
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Add review
router.post('/:productId', async (req, res) => {
  try {
    const { userName, reviewMessage } = req.body;
    const review = await reviewService.addReview(req.params.productId, userName, reviewMessage);
    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

module.exports = router;