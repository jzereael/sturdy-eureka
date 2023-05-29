const express = require('express');
const router = express.Router();
const randomNumberController = require('../controllers/random-number-api.controllers');

router.post('/', randomNumberController.generateRandomNumber);
router.get('/', randomNumberController.getAllRandomNumbers);
router.get('/:id',randomNumberController.getRandomNumbersById);
router.delete('/:id',randomNumberController.deleteRandomNumberById);

module.exports = router;