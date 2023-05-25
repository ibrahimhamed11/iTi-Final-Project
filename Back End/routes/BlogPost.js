const express = require('express');
const router = express.Router();
const blogPostController  = require('./../controllers/blogPostController')

router.post('/blog-posts', blogPostController.createBlogPost);
router.get('/blog-posts', blogPostController.getAllBlogPosts);
router.get('/blog-posts/:id', blogPostController.getBlogPostById);
router.put('/blog-posts/:id', blogPostController.updateBlogPost);
router.delete('/blog-posts/:id', blogPostController.deleteBlogPost);

module.exports = router;
