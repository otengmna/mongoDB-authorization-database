
const express = require('express');

const CarController = require('../controllers/carsController');

const router = express.Router();


router.get('/all-cars', CarController.getAllCars);
router.get('/all-cars/all-makes', CarController.getAllMakes);
router.get('/all-cars/all-makes-by-year/:carYear', CarController.getAllCarsByYear);
router.get('/all-cars/all-makes/all-models-of/:carMake', CarController.getAllModelsofMake);
router.get('/all-cars/all-makes/all-models-of/:carYear/:carMake', CarController.getAllModelsofMakeByYear);
router.get('/all-car-years', CarController.getAllDistictYears);
router.get('/all-makes-by-year/:carYear', CarController.getAllDistinctMakesByYear);
router.post('/add-car', CarController.addCar);

module.exports = router;