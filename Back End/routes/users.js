const express = require('express');
const cors = require('cors');
const path = require('path');

const authMiddleware = require('../controllers/auth');
const controllers = require('../controllers/userController');
const loginAuth = require('../controllers/loginAuth');

const router = express.Router();

router.use(cors());
router.use(express.json());

router.post('/register', controllers.createUser);
router.post('/login', controllers.loginUser);
// Define a route for the login page
router.get('/login',controllers.getlogin );
// router.use(loginAuth);
// router.use(authMiddleware);

router.get('/getallusers', controllers.getAllUsers);
router.get('/user/:userId', controllers.getUser);
router.delete('/user/:userId', controllers.deleteUser);
router.put('/user', controllers.updateUser);
router.use(express.static(path.join(__dirname, './../public')));

module.exports = router
