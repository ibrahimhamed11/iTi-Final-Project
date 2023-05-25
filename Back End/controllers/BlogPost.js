const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const BlogPost = require('../Models/blogPost');

// Create a new blog post
exports.createBlog= async (req, res) => {
  try {
    const blogPost = new BlogPost({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    const savedBlogPost = await blogPost.save();
    res.status(201).json(savedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all blog posts
exports.getAllBlogs= async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'name');
    res.json(blogPosts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get a single blog post
exports.getBlog= (req, res) =>  res.json(res.blogPost);


// Update a blog post
exports.updateBlog= async (req, res) => {
  if (req.body.title != null) {
    res.blogPost.title = req.body.title;
  }

  if (req.body.content != null) {
    res.blogPost.content = req.body.content;
  }

  try {
    const updatedBlogPost = await res.blogPost.save();
    res.json(updatedBlogPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete a blog post
exports.deleteBlog= async (req, res) => {
  try {
    await res.blogPost.remove();
    res.json({ message: 'Blog post deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Middleware function to get a single blog post by ID
 exports.getBlogPostasync= async(req, res, next) =>{
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'name');
    if (blogPost == null) {
      return res.status(404).json({ message: 'Cannot find blog post' });
    }
    res.blogPost = blogPost;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

// Middleware function to authenticate a JWT token
exports.authenticateToken = async(req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    req.user = user;
    next();
  });
}

