const express = require('express');
const router = express.Router();
const authMiddleware = require('../controllers/auth')
const BlogsController  = require('../controllers/blogPost')

router.post('/', authMiddleware.authenticateToken , BlogsController.createBlog)
router.get('/',BlogsController.getAllBlogs) 

router.get('/:id', BlogsController.getBlog)



router.patch('/:id', authMiddleware.getBlogPostasync, BlogsController.updateBlog)

router.delete('/:id', authMiddleware.getBlogPostasync, BlogsController.deleteBlog)

module.exports = router;
