const express = require('express');
const router = express.Router();
const authMiddleware = require('../controllers/auth');
const BlogsController  = require('../controllers/blogPost');
router.post('/',BlogsController.upload.single('image') , BlogsController.createBlog)
router.get('/',BlogsController.getAllBlogs) 
router.get('/:id', BlogsController.getBlog)
router.patch('/:id', BlogsController.updateBlog)
router.delete('/:id',BlogsController.deleteBlog)

module.exports = router;
