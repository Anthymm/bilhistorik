const express = require('express');
const router = express.Router();
const ownershipsController = require('../controllers/ownershipsController');

router.get('/api/ownership', ownershipsController.getOwnerships)
router.post('/api/ownership', ownershipsController.addOwnership)
router.put('/api/ownership', ownershipsController.updateOwnership)
router.delete('/api/ownership', ownershipsController.removeOwnership)

module.exports = router;
