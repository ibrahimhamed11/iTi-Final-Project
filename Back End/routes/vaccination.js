const express = require('express');
const router = express.Router();

const vaccinationController = require('../controllers/vaccinationController');

// Dashboard Page 
//Add a vaccination
router.post('/add', vaccinationController.createVaccination);
// Update a vaccination
router.put('/:Id', vaccinationController.updateVaccination);
// Delete a vaccination
router.delete('/:Id', vaccinationController.deleteVaccination);

//---------------------------------------------------------------------------------------------------

//only get in mother profile
router.get('/user/:motherId', vaccinationController.getVaccinationsForMother);

module.exports = router;
