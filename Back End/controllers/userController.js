const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const express = require('express');
const User = require('../Models/Users');

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
      password:hashedPassword,
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
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database based on the username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // Check if the password is valid
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, config.jwtSecret, {
      expiresIn: '1h',
    });
        // Store the token in a cookie
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Max age is set to 1 hour (in milliseconds)


    // Return the token in the response
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

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
