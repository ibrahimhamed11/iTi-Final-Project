const mongoose = require('mongoose');
const validator = require('validator');
const Product = require('./products')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address'
    }
  },
  image: {
    type: String

  },
  registrationDate: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    // required: true
  },
  age: {
    type: Number,
    // required: true
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  numOfBaby: {
    type: Number,
    // required: true,

  },
  role: {
    type: String,
    required: true,

  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  profile: {
    babyInfo: [
      {
        name: String,
        weight: Number,
        height: Number,
        headSize: Number,
        age: Number,
        temperature: Number,
        vaccination: Array,
        extraInfo: [
          {
            foodTracker: String,
            kindOfFood: String
          }
        ],
        reportFile: String
      }
    ]
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
