const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// Serve images from assets folder
// GET /api/images/:folder/:imageNumber
router.get('/:folder/:imageNumber', (req, res) => {
  try {
    const { folder, imageNumber } = req.params;
    
    // Construct the path to the image
    // Assuming your assets folder is at the root of your project
    const imagePath = path.join(__dirname, '..', 'assets', folder, imageNumber);
    
    // Check if file exists
    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({
        success: false,
        message: 'Image not found'
      });
    }
    
    // Send the image file
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Get all images for a product
// GET /api/images/:folder
router.get('/:folder', (req, res) => {
  try {
    const { folder } = req.params;
    
    // Path to the product folder
    const folderPath = path.join(__dirname, '..', 'assets', folder);
    
    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({
        success: false,
        message: 'Product folder not found'
      });
    }
    
    // Read all files in the folder
    const files = fs.readdirSync(folderPath);
    
    // Filter for image files only
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
    });
    
    // Return list of image URLs
    const imageUrls = imageFiles.map(file => 
      `/api/images/${folder}/${file}`
    );
    
    res.json({
      success: true,
      data: {
        folder: folder,
        imageCount: imageFiles.length,
        images: imageUrls
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;