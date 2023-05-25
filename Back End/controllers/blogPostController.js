const BlogPost = require('../Models/BlogPost');

const createBlogPost = async (req, res) => {
  try {
    const blogPost = new BlogPost(req.body);
    await blogPost.save();
    res.status(201).json(blogPost);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await BlogPost.find().populate('author', 'username');
    res.json(blogPosts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


const getBlogPostById = async (req, res) => {
  try {
    const blogPost = await BlogPost.findById(req.params.id).populate('author', 'username');
    if (!blogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


const updateBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!blogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json(blogPost);
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};


const deleteBlogPost = async (req, res) => {
  try {
    const blogPost = await BlogPost.findByIdAndDelete(req.params.id);
    if (!blogPost) {
      res.status(404).json({ error: 'Blog post not found' });
    } else {
      res.json({ message: 'Blog post deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};

module.exports = {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost
};
