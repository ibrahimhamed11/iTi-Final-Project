"use strict";

var mongoose = require("mongoose");

var validator = require("validator");

var Product = require("./products");

var todo = require("./todoSchema");

var Posts = require("./BlogPost");

var Comments = require("./comments");

var Orders = require("./orders");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address"
    }
  },
  image: {
    type: String
  },
  registrationDate: {
    type: Date,
    "default": Date.now // Set the default value to the current date and time

  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String // required: true

  },
  age: {
    type: Number // required: true

  },
  phone: {
    type: Number,
    "default": 0
  },
  address: {
    type: String
  },
  numOfBaby: {
    type: Number // required: true,

  },
  role: {
    type: String,
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  },
  profile: {
    babyInfo: [{
      name: String,
      weight: Number,
      height: Number,
      headSize: Number,
      age: Number,
      temperature: Number,
      vaccination: Array,
      extraInfo: [{
        foodTracker: String,
        kindOfFood: String
      }],
      reportFile: String
    }]
  },
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "todo"
  },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts"
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments"
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders"
  }
});
var User = mongoose.model("User", userSchema);
module.exports = User;