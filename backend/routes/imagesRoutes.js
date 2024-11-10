const express = require('express');
const router = express.Router();
const imagesController = require('../controllers/imagesController');

router.post('/api/images', imagesController.addImage);
router.get('/api/images', imagesController.getImages);
router.patch('/api/images', imagesController.updateImage)
router.delete('/api/images', imagesController.removeImage)

module.exports = router;
