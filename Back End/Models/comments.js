const mongoose = require('mongoose');
const User = require('./Users'); // Import User model
const BlogPost = require('./BlogPost'); // Import BlogPost model

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  blogPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BlogPost',
    required: true
  }
});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
