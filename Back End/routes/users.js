const express = require('express');

 const authMiddleware = require('../controllers/auth');
const UsersController = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/register', UsersController.createUser);
// Login route
router.post('/login', UsersController.loginUser);
//  router.use(loginAuthMiddleware);
// router.use(authMiddleware);
//get all users 
router.get('/users',UsersController.getAllUsers);

// Protected routes - Requires authentication middleware


// Get user route
router.get('/user/:userId',UsersController.getUser );
// Delete user route
router.delete('/user/:userId', UsersController.deleteUser);



// Update user route
router.put('/user', UsersController.updateUser);


