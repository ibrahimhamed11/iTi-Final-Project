const express = require('express');

const path = require('path');

const authMiddleware = require('../controllers/auth');
const controllers = require('../controllers/userController');
const loginAuth = require('../controllers/loginAuth');

const router = express.Router();




router.post('/register', controllers.createUser);
router.post('/login', controllers.loginUser);
// Define a route for the login page
router.get('/login',controllers.getlogin );
router.get('/register',controllers.getRegister );
// router.use(loginAuth);
// router.use(authMiddleware);
router.get('/getallusers', controllers.getAllUsers);
router.get('/getallmothers', controllers.getAllMothers);
router.get('/getallseller', controllers.getAllSeller);
router.get('/getallsellernum', controllers.getNumberOfSellers);
router.get('/getallmothernum', controllers.getNumberOfMothers);
router.get('/getallpregnantnum', controllers.getNumberOfPregnant);
router.get('/getallusersnum', controllers.getNumberOfUsers);
router.get('/:userId', controllers.getUser);
router.delete('/:userId', controllers.deleteUser);
router.put('/:userId', controllers.updateUser);
//for charts 
router.get('/mothers-per-day', controllers.getMotherRegisteredPerDay);
router.get('/pregnant-per-day', controllers.getPregnantRegisteredPerDay);
router.get('/seller-per-day', controllers.getSellerRegisteredPerDay);

router.use(express.static(path.join(__dirname, './../public')));
module.exports = router
