const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config");
const express = require("express");
const User = require("../Models/Users");
const path = require("path");
const cookieParser = require("cookie-parser");
const { body } = require("express-validator/check");
const key = "test"; // Repl
const multer = require("multer");
const date = require("date-and-time");


const Vaccination = require('../Models/vaccination');

// Configure multer for file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads/");
  },
  filename: (req, file, callback) => {
    const fileName = Date.now() + file.originalname.replace(/ /g, "") || "";
    callback(null, fileName);
  },
});
exports.upload = multer({ storage: fileStorage });

//Register
exports.createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      username,
      age,
      phone,
      address,
      numOfBaby,
      isPregnant,
      pregnancyMonth,
      babyWeight,
      role,
    } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    ///const hashedPassword ="testtesttesttest";
    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
      age,
      phone,
      address,
      numOfBaby,
      isPregnant,
      pregnancyMonth,
      babyWeight,
      role,
      image: req.file ? req.file.filename : "./uploads/user.webp",
    });
    // Save the user to the database
    await newUser.save();
    res.status(200).json({ message: "User created successfully", status: 200 });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal error" });
  }
};

//Login

exports.loginUser = async function (req, res) {
  try {
    // Find user by email
    const email = req.body.email;
    let user = await User.findOne({ email: email });

    if (user) {
      // Compare the password

      const password = req.body.password;
      let isEqual = await bcrypt.compare(password, user.password);

      if (isEqual) {
        // Generate a JWT token

        let payload = { userId: user._id, role: user.role };
        let token = jwt.sign(payload, key);

        // Set the token as a cookie and redirect to the home page
        res.cookie("token", token, { maxAge: 900000, httpOnly: true });
        console.log(payload);
        // res.redirect('getallusers');
        res
          .status(200)
          .json({ data: { token: token, user: user }, status: 200 });
      }
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Error logging in user" });
  }
};

// get login
exports.getlogin = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
};

// get register
exports.getRegister = async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/register.html"));
};

// Get user
exports.getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ data: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const userId = req.body.userId;
    const updatedData = req.body.updatedData;

    // Find the user by ID and update the data
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ updatedUser, status: 200 });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};



// Add baby
exports.addBaby = async (req, res) => {
  try {
    const userId = req.params.id;
    const babyInfo = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const { age } = babyInfo;

    // Find vaccinations that have a minimum and maximum range that includes the baby's age
    const vaccinations = await Vaccination.find({
      min: { $lte: age },
      max: { $gte: age },
    });

    if (vaccinations.length === 0) {
      // No applicable vaccinations found, add null vaccination array
      babyInfo.vaccination = [];
    } else {
      // Add the baby's vaccination details
      babyInfo.vaccination = vaccinations;
    }

    // Add the baby's details to the user's babyInfo array
    user.profile.babyInfo.push(babyInfo);
    await user.save();

    res.status(200).json({ message: 'Baby added successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error adding baby' });
  }
};


//Get User babies

exports.getBaby = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    console.log(user.profile.babyInfo)
    if (!user) {
      return res.status(404).json({ error: "User not found" })
    }

    res.status(200).json(user.profile.babyInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await User.findByIdAndDelete(userId);

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
//Get All users
exports.getAllUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();

    res.status(200).json({ users });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllMothers = async (req, res) => {
  try {
    // Find all users in the database
    const mothers = await User.find({ role: "mother" });

    res.status(200).json({ mothers });
  } catch (error) {
    console.error("Error retrieving mothers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Mariam Added get pregnants+get admins
exports.getAllPregnants = async (req, res) => {
  try {
    // Find all users in the database
    const pregnants = await User.find({ role: "pregnant" });

    res.status(200).json({ pregnants });
  } catch (error) {
    console.error("Error retrieving pregnants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllAdmins = async (req, res) => {
  try {
    // Find all users in the database
    const admins = await User.find({ role: "admin" });

    res.status(200).json({ admins });
  } catch (error) {
    console.error("Error retrieving Admins:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllSeller = async (req, res) => {
  try {
    // Find all users in the database
    const sellers = await User.find({ role: "seller" });

    res.status(200).json({ sellers });
  } catch (error) {
    console.error("Error retrieving sellers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllpregnant = async (req, res) => {
  try {
    // Find all users in the database
    const pregnants = await User.find({ role: "pregnant" });

    res.status(200).json({ pregnants });
  } catch (error) {
    console.error("Error retrieving pregnants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNumberOfPregnant = async (req, res) => {
  try {
    // Find all users in the database with the role "pregnant"
    const pregnants = await User.find({ role: "pregnant" });

    // Get the count of all mothers Number
    const totalMothers = pregnants.length;

    res.status(200).json({ totalMothers });
  } catch (error) {
    console.error("Error retrieving pregnants:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNumberOfMothers = async (req, res) => {
  try {
    // Find all users in the database with the role "mother"
    const mothers = await User.find({ role: "mother" });

    // Get the count of mothers Number
    const countMothers = mothers.length;

    res.status(200).json({ countMothers });
  } catch (error) {
    console.error("Error retrieving number of mothers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getNumberOfSellers = async (req, res) => {
  try {
    // Find all users in the database with the role "seller"
    const sellers = await User.find({ role: "seller" });

    // Get the count of sellers Number
    const countSellers = sellers.length;

    res.status(200).json({ countSellers });
  } catch (error) {
    console.error("Error retrieving number of sellers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All users Number
exports.getNumberOfUsers = async (req, res) => {
  try {
    // Find all users in the database
    const users = await User.find();
    const count = users.length;

    res.status(200).json({ count });
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getMotherRegisteredPerDay = async (req, res) => {
  let registrations = {}; // Declare the registrations object outside the try block
  try {
    const result = await User.aggregate([
      {
        $match: { role: "mother" }, // Add a $match stage to filter users with role "mother"
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$registrationDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // The result will be an array of objects with the format { _id: 'yyyy-mm-dd', count: <number> }

    // Convert the array of objects into an object with dates as keys and counts as values
    // result.forEach((item) => {
    //   registrations[item._id] = item.count;
    // });

    // Send the registrations object as the response
    res.json({ data: result });
  } catch (error) {
    console.log(registrations);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getPregnantRegisteredPerDay = async (req, res) => {
  let registrations = {}; // Declare the registrations object outside the try block
  try {
    const result = await User.aggregate([
      {
        $match: { role: "pregnant" }, // Add a $match stage to filter users with role "mother"
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$registrationDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Convert the array of objects into an object with dates as keys and counts as values
    // result.forEach((item) => {
    //   registrations[item._id] = item.count;
    // });

    // Send the registrations object as the response
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getSellerRegisteredPerDay = async (req, res) => {
  let registrations = {}; // Declare the registrations object outside the try block
  try {
    const result = await User.aggregate([
      {
        $match: { role: "seller" }, // Add a $match stage to filter users with role "mother"
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$registrationDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Convert the array of objects into an object with dates as keys and counts as values
    // result.forEach((item) => {
    //   registrations[item._id] = item.count;
    // });

    // Send the registrations object as the response
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};



//get baby vaccination
exports.getBabyVaccinationsById = async (req, res) => {
  try {
    const babyId = req.params.babyId;
    const user = await User.findOne({ 'profile.babyInfo._id': babyId });
    if (user && user.profile && user.profile.babyInfo) {
      const baby = user.profile.babyInfo.find((baby) => baby._id.toString() === babyId);
      if (baby) {
        const vaccinations = baby.vaccination;
        res.status(200).json({ vaccinations });
      } else {
        res.status(404).json({ message: 'Baby not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving baby vaccinations' });
  }
};











exports.updateVaccinationStatus = async (req, res) => {
  try {
    const babyId = req.params.babyId;
    const vaccinationId = req.params.vaccinationId;

    const user = await User.findOne({ 'profile.babyInfo._id': babyId });

    if (user && user.profile && user.profile.babyInfo) {
      const baby = user.profile.babyInfo.find((baby) => baby._id.toString() === babyId);

      if (baby) {
        const vaccination = baby.vaccination.find((vaccine) => vaccine._id.toString() === vaccinationId);

        if (vaccination) {
          // Update the status of the vaccination
          vaccination.status = true;

          // Save the updated user
          await user.save();

          // Return the updated vaccination
          res.status(200).json({ vaccination });
        } else {
          res.status(404).json({ message: 'Vaccination not found' });
        }
      } else {
        res.status(404).json({ message: 'Baby not found' });
      }
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating vaccination status' });
  }
};
