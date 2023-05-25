const express = require('express');

 const authMiddleware = require('../controllers/auth');
const BlogsController = require('../controllers/BlogPost');

const router = express.Router();

router.post('/', BlogsController.authenticateToken, BlogsController.createBlog)// Login route
router.get('/',BlogsController.getAllUsers)//  router.use(loginAuthMiddleware);

router.get('/:id', BlogsController.getBlogPost, BlogsController.getBlog)



router.patch('/:id', BlogsController.getBlogPost, BlogsController.updateBlog)

router.delete('/:id',BlogsController.getBlogPost ,BlogsController.updateBlog)
module.exports = router;