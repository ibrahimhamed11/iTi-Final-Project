"use strict";

var express = require('express');

var router = express.Router();

var vaccinationController = require('../controllers/vaccinationController'); // Dashboard Page 
//Add a vaccinationnn 


router.post('/add', vaccinationController.createVaccination); // get  vaccines

router.get('/getAll', vaccinationController.getAllVaccines); // get a vaccine by ID

router.get('/:vaccinationId', vaccinationController.getVaccineById); // Update a vaccination

router.put('/:vaccinationId', vaccinationController.updateVaccination); // Delete a vaccination

router["delete"]('/:vaccinationId', vaccinationController.deleteVaccination); //get baby vaccination 
//---------------------------------------------------------------------------------------------------
//only get in mother profile
// router.get('/user/:motherId', vaccinationController.getVaccinationsForMother);

module.exports = router;