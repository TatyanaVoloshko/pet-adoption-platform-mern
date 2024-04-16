//backend/config/imageRoutes.js
const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

// Route for serving images
router.get('/images/:key', imageController.serveImage);
// Route for serving alternative images (when the primary image can't load)
router.get('/alternative-images/:imageName', imageController.serveAlternativeImage);

module.exports = router;
