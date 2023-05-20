const express = require('express');

 const authMiddleware = require('../controllers/auth');
const controllers = require('../controllers/userController');

const router = express.Router();

// Signup route
router.post('/register', controllers.createUser);
// Login route
router.post('/login', controllers.loginUser);
//  router.use(loginAuthMiddleware);
// router.use(authMiddleware);
//get all users 
router.get('/users',controllers.getAllUsers);

// Protected routes - Requires authentication middleware


// Get user route
router.get('/user/:userId',controllers.getUser );
// Delete user route
router.delete('/user/:userId', controllers.deleteUser);



// Update user route
router.put('/user', controllers.updateUser);







module.exports = router;
