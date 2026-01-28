const express = require('express');
const router = express.Router();
const productService = require('../services/productService');
const { authenticate, authorizeUser } = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await productService.getAllProducts();
    res.json({
      success: true,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get single product by ID
router.get('/:productId', async (req, res) => {
  try {
    const product = await productService.getProductById(req.params.productId);
    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
});

// Add new product (admin only)
router.post('/', authenticate, authorizeUser, async (req, res) => {
  try {
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
    } = req.body;

    const product = await productService.addProduct({
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
    });

    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;