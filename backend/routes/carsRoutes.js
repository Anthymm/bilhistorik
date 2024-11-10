const express = require('express');
const router = express.Router();
const carsController = require('../controllers/carsController');

router.post('/api/cars', carsController.addCar);
router.get('/api/cars', carsController.getCars);
router.patch('/api/cars', carsController.updateCar)
router.delete('/api/cars', carsController.removeCar)

module.exports = router;
