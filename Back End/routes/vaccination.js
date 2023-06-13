const express = require('express');
const router = express.Router();

const vaccinationController = require('../controllers/vaccinationController');

// Dashboard Page 
//Add a vaccination
router.post('/add', vaccinationController.createVaccination);
// get  vaccines
router.get('/getAll', vaccinationController.getAllVaccines);
// get a vaccine by ID
router.get('/:id', vaccinationController.getVaccineById);
// Update a vaccination
router.put('/:id', vaccinationController.updateVaccination);
// Delete a vaccination
router.delete('/:id', vaccinationController.deleteVaccination);

//---------------------------------------------------------------------------------------------------

//only get in mother profile
router.get('/user/:motherId', vaccinationController.getVaccinationsForMother);

module.exports = router;
