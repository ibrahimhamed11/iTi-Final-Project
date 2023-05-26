const mongoose = require('mongoose');
const user = require('./Users');
const comment = require('./comments');
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
    ref: 'user',
    required: true
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment'
    }
  ]
});

const blogPost= mongoose.model('blogPosts', blogPostSchema);
module.exports = blogPost
