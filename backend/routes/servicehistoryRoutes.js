const express = require('express');
const router = express.Router();
const servicehistoryController = require('../controllers/servicehistoryController');

router.post('/api/servicehistory', servicehistoryController.addServiceHistory);
router.get('/api/servicehistory', servicehistoryController.getServiceHistory);
router.patch('/api/servicehistory', servicehistoryController.updateServiceHistory)
router.delete('/api/servicehistory', servicehistoryController.removeServiceHistory)

module.exports = router;
