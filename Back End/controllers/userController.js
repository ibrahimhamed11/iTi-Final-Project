const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const express = require('express');
const user = require('../Models/Users');
const path = require('path');
const cookieParser = require('cookie-parser');
const key = 'test'; // Repl
// signUp

exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      username,
      age,
      numOfBaby,
      isPregnant,
      pregnancyMonth,
      babyWeight,
      profile: { babyInfo },
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email,
      password,
      username,
      age,
      numOfBaby,
      isPregnant,
      pregnancyMonth,
      babyWeight,
      profile: { babyInfo },
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal error' });
  }
};
//Login 

exports.loginUser = async function (req, res) {
  try {
    // Find user by email and password
    let user = await User.findOne({
      password: req.body.password,
  
      email: req.body.email,
    });
    // console.log(User);

    if (user) {
      // Generate a JWT token
    let payload = { userId: user._id };
    let token = jwt.sign(payload, key);

    // Set the token as a cookie and redirect to the home page
    res.cookie('token', token, { maxAge: 900000, httpOnly: true });
  console.log(payload);
      res.redirect('getallusers');

    } else {
          // console.log(User);
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
};

// get login  
exports.getlogin =async(req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
}

// Get user
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Update user
exports.updateUser = (req, res) => {
  try {
    // ... rest of the update user code ...
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
//Get All users 
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
