const mongoose = require("mongoose");
const validator = require("validator");
const Product = require("./products");
const todo = require("./todoSchema");
const Posts = require("./BlogPost");
const Comments = require("./comments");
const Orders = require("./orders");

const vaccinationSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  max: Number,
  min: Number,
  date: Date,
  status: Boolean,
  __v: Number,
});

const babyInfoSchema = new mongoose.Schema({
  name: String,
  weight: Number,
  height: Number,
  headSize: Number,
  age: Number,
  temperature: Number,
  vaccination: [vaccinationSchema],
  extraInfo: [
    {
      foodTracker: String,
      kindOfFood: String,
    },
  ],
  reportFile: String,
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email address",
    },
  },
  image: {
    type: String,
  },
  registrationDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  username: {
    type: String,
  },
  age: {
    type: Number,
  },
  phone: {
    type: Number,
    default: 0,
  },
  address: {
    type: String,
  },
  numOfBaby: {
    type: Number,
  },
  role: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
  profile: {
    babyInfo: [babyInfoSchema],
  },
  todo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "todo",
  },
  blogs: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Posts",
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
  orders: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Orders",
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
