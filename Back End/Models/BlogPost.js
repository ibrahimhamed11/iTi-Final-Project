const mongoose = require('mongoose');
const Users = require('./Users'); // Import User model

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;
