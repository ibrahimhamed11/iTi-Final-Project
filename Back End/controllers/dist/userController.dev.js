"use strict";

var bcrypt = require("bcrypt");

var jwt = require("jsonwebtoken");

var config = require("../config/config");

var express = require("express");

var User = require("../Models/Users");

var path = require("path");

var cookieParser = require("cookie-parser");

var _require = require("express-validator/check"),
    body = _require.body;

var key = "test"; // Repl

var multer = require("multer");

var date = require("date-and-time");

var Vaccination = require('../Models/vaccination'); // Configure multer for file storage


var fileStorage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function filename(req, file, callback) {
    var fileName = Date.now() + file.originalname.replace(/ /g, "") || "";
    callback(null, fileName);
  }
});
exports.upload = multer({
  storage: fileStorage
}); //Register

exports.createUser = function _callee(req, res) {
  var _req$body, name, email, password, username, age, phone, address, numOfBaby, isPregnant, pregnancyMonth, babyWeight, role, existingUser, salt, hashedPassword, newUser;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password, username = _req$body.username, age = _req$body.age, phone = _req$body.phone, address = _req$body.address, numOfBaby = _req$body.numOfBaby, isPregnant = _req$body.isPregnant, pregnancyMonth = _req$body.pregnancyMonth, babyWeight = _req$body.babyWeight, role = _req$body.role; // Check if the user already exists

          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;

          if (!existingUser) {
            _context.next = 7;
            break;
          }

          return _context.abrupt("return", res.status(409).json({
            error: "email already exists"
          }));

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.genSalt(10));

        case 9:
          salt = _context.sent;
          _context.next = 12;
          return regeneratorRuntime.awrap(bcrypt.hash(password, salt));

        case 12:
          hashedPassword = _context.sent;
          ///const hashedPassword ="testtesttesttest";
          // Create a new user
          newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
            username: username,
            age: age,
            phone: phone,
            address: address,
            numOfBaby: numOfBaby,
            isPregnant: isPregnant,
            pregnancyMonth: pregnancyMonth,
            babyWeight: babyWeight,
            role: role,
            image: req.file ? req.file.filename : "./uploads/user.webp"
          }); // Save the user to the database

          _context.next = 16;
          return regeneratorRuntime.awrap(newUser.save());

        case 16:
          res.status(200).json({
            message: "User created successfully",
            status: 200
          });
          _context.next = 23;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          console.error("Error creating user:", _context.t0);
          res.status(500).json({
            error: "Internal error"
          });

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; //Login


exports.loginUser = function _callee2(req, res) {
  var email, user, password, isEqual, payload, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Find user by email
          email = req.body.email;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          user = _context2.sent;

          if (!user) {
            _context2.next = 13;
            break;
          }

          // Compare the password
          password = req.body.password;
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

        case 9:
          isEqual = _context2.sent;

          if (isEqual) {
            // Generate a JWT token
            payload = {
              userId: user._id,
              role: user.role
            };
            token = jwt.sign(payload, key); // Set the token as a cookie and redirect to the home page

            res.cookie("token", token, {
              maxAge: 900000,
              httpOnly: true
            });
            console.log(payload); // res.redirect('getallusers');

            res.status(200).json({
              data: {
                token: token,
                user: user
              },
              status: 200
            });
          }

          _context2.next = 14;
          break;

        case 13:
          res.status(401).json({
            error: "Invalid email or password"
          });

        case 14:
          _context2.next = 20;
          break;

        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](0);
          console.error("Error logging in user:", _context2.t0);
          res.status(500).json({
            error: "Error logging in user"
          });

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 16]]);
}; // get login


exports.getlogin = function _callee3(req, res) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          res.sendFile(path.join(__dirname, "../public/login.html"));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
}; // get register


exports.getRegister = function _callee4(req, res) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          res.sendFile(path.join(__dirname, "../public/register.html"));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
}; // Get user


exports.getUser = function _callee5(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          userId = req.params.userId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          user = _context5.sent;

          if (user) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 7:
          res.status(200).json({
            data: user
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}; // Update user


exports.updateUser = function _callee6(req, res) {
  var userId, updatedData, updatedUser;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.body.userId;
          updatedData = req.body.updatedData; // Find the user by ID and update the data

          _context6.next = 5;
          return regeneratorRuntime.awrap(User.findByIdAndUpdate(userId, updatedData, {
            "new": true
          }));

        case 5:
          updatedUser = _context6.sent;

          if (updatedUser) {
            _context6.next = 8;
            break;
          }

          return _context6.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 8:
          res.status(200).json({
            updatedUser: updatedUser,
            status: 200
          });
          _context6.next = 14;
          break;

        case 11:
          _context6.prev = 11;
          _context6.t0 = _context6["catch"](0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 14:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // Add baby


exports.addBaby = function _callee7(req, res) {
  var userId, babyInfo, user, age, vaccinations;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          userId = req.params.id;
          babyInfo = req.body;
          _context7.next = 5;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 5:
          user = _context7.sent;

          if (user) {
            _context7.next = 8;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: 'User not found'
          }));

        case 8:
          age = babyInfo.age; // Find vaccinations that have a minimum and maximum range that includes the baby's age

          _context7.next = 11;
          return regeneratorRuntime.awrap(Vaccination.find({
            min: {
              $lte: age
            },
            max: {
              $gte: age
            }
          }));

        case 11:
          vaccinations = _context7.sent;

          if (vaccinations.length === 0) {
            // No applicable vaccinations found, add null vaccination array
            babyInfo.vaccination = null;
          } else {
            // Add the baby's vaccination details
            babyInfo.vaccination = vaccinations;
          } // Add the baby's details to the user's babyInfo array


          user.profile.babyInfo.push(babyInfo);
          _context7.next = 16;
          return regeneratorRuntime.awrap(user.save());

        case 16:
          res.status(200).json({
            message: 'Baby added successfully'
          });
          _context7.next = 23;
          break;

        case 19:
          _context7.prev = 19;
          _context7.t0 = _context7["catch"](0);
          console.log(_context7.t0);
          res.status(500).json({
            error: 'Error adding baby'
          });

        case 23:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 19]]);
}; //Get User babies


exports.getBaby = function _callee8(req, res) {
  var userId, user;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          userId = req.params.id;
          _context8.next = 4;
          return regeneratorRuntime.awrap(User.findById(userId));

        case 4:
          user = _context8.sent;
          console.log(user.profile.babyInfo);

          if (user) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            error: "User not found"
          }));

        case 8:
          res.status(200).json(user.profile.babyInfo);
          _context8.next = 15;
          break;

        case 11:
          _context8.prev = 11;
          _context8.t0 = _context8["catch"](0);
          console.log(_context8.t0);
          res.status(500).json(_context8.t0);

        case 15:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 11]]);
}; // Delete user


exports.deleteUser = function _callee9(req, res) {
  var userId;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.prev = 0;
          userId = req.params.userId;
          _context9.next = 4;
          return regeneratorRuntime.awrap(User.findByIdAndDelete(userId));

        case 4:
          res.status(200).json({
            message: "User deleted successfully"
          });
          _context9.next = 10;
          break;

        case 7:
          _context9.prev = 7;
          _context9.t0 = _context9["catch"](0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 10:
        case "end":
          return _context9.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; //Get All users


exports.getAllUsers = function _callee10(req, res) {
  var users;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.prev = 0;
          _context10.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context10.sent;
          res.status(200).json({
            users: users
          });
          _context10.next = 11;
          break;

        case 7:
          _context10.prev = 7;
          _context10.t0 = _context10["catch"](0);
          console.error("Error retrieving users:", _context10.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context10.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllMothers = function _callee11(req, res) {
  var mothers;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          _context11.prev = 0;
          _context11.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "mother"
          }));

        case 3:
          mothers = _context11.sent;
          res.status(200).json({
            mothers: mothers
          });
          _context11.next = 11;
          break;

        case 7:
          _context11.prev = 7;
          _context11.t0 = _context11["catch"](0);
          console.error("Error retrieving mothers:", _context11.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context11.stop();
      }
    }
  }, null, null, [[0, 7]]);
}; // Mariam Added get pregnants+get admins


exports.getAllPregnants = function _callee12(req, res) {
  var pregnants;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          _context12.prev = 0;
          _context12.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "pregnant"
          }));

        case 3:
          pregnants = _context12.sent;
          res.status(200).json({
            pregnants: pregnants
          });
          _context12.next = 11;
          break;

        case 7:
          _context12.prev = 7;
          _context12.t0 = _context12["catch"](0);
          console.error("Error retrieving pregnants:", _context12.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllAdmins = function _callee13(req, res) {
  var admins;
  return regeneratorRuntime.async(function _callee13$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          _context13.prev = 0;
          _context13.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "admin"
          }));

        case 3:
          admins = _context13.sent;
          res.status(200).json({
            admins: admins
          });
          _context13.next = 11;
          break;

        case 7:
          _context13.prev = 7;
          _context13.t0 = _context13["catch"](0);
          console.error("Error retrieving Admins:", _context13.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context13.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllSeller = function _callee14(req, res) {
  var sellers;
  return regeneratorRuntime.async(function _callee14$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.prev = 0;
          _context14.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "seller"
          }));

        case 3:
          sellers = _context14.sent;
          res.status(200).json({
            sellers: sellers
          });
          _context14.next = 11;
          break;

        case 7:
          _context14.prev = 7;
          _context14.t0 = _context14["catch"](0);
          console.error("Error retrieving sellers:", _context14.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context14.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getAllpregnant = function _callee15(req, res) {
  var pregnants;
  return regeneratorRuntime.async(function _callee15$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.prev = 0;
          _context15.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "pregnant"
          }));

        case 3:
          pregnants = _context15.sent;
          res.status(200).json({
            pregnants: pregnants
          });
          _context15.next = 11;
          break;

        case 7:
          _context15.prev = 7;
          _context15.t0 = _context15["catch"](0);
          console.error("Error retrieving pregnants:", _context15.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 11:
        case "end":
          return _context15.stop();
      }
    }
  }, null, null, [[0, 7]]);
};

exports.getNumberOfPregnant = function _callee16(req, res) {
  var pregnants, totalMothers;
  return regeneratorRuntime.async(function _callee16$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          _context16.prev = 0;
          _context16.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "pregnant"
          }));

        case 3:
          pregnants = _context16.sent;
          // Get the count of all mothers Number
          totalMothers = pregnants.length;
          res.status(200).json({
            totalMothers: totalMothers
          });
          _context16.next = 12;
          break;

        case 8:
          _context16.prev = 8;
          _context16.t0 = _context16["catch"](0);
          console.error("Error retrieving pregnants:", _context16.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 12:
        case "end":
          return _context16.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getNumberOfMothers = function _callee17(req, res) {
  var mothers, countMothers;
  return regeneratorRuntime.async(function _callee17$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          _context17.prev = 0;
          _context17.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "mother"
          }));

        case 3:
          mothers = _context17.sent;
          // Get the count of mothers Number
          countMothers = mothers.length;
          res.status(200).json({
            countMothers: countMothers
          });
          _context17.next = 12;
          break;

        case 8:
          _context17.prev = 8;
          _context17.t0 = _context17["catch"](0);
          console.error("Error retrieving number of mothers:", _context17.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 12:
        case "end":
          return _context17.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getNumberOfSellers = function _callee18(req, res) {
  var sellers, countSellers;
  return regeneratorRuntime.async(function _callee18$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          _context18.prev = 0;
          _context18.next = 3;
          return regeneratorRuntime.awrap(User.find({
            role: "seller"
          }));

        case 3:
          sellers = _context18.sent;
          // Get the count of sellers Number
          countSellers = sellers.length;
          res.status(200).json({
            countSellers: countSellers
          });
          _context18.next = 12;
          break;

        case 8:
          _context18.prev = 8;
          _context18.t0 = _context18["catch"](0);
          console.error("Error retrieving number of sellers:", _context18.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 12:
        case "end":
          return _context18.stop();
      }
    }
  }, null, null, [[0, 8]]);
}; // Get All users Number


exports.getNumberOfUsers = function _callee19(req, res) {
  var users, count;
  return regeneratorRuntime.async(function _callee19$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          _context19.prev = 0;
          _context19.next = 3;
          return regeneratorRuntime.awrap(User.find());

        case 3:
          users = _context19.sent;
          count = users.length;
          res.status(200).json({
            count: count
          });
          _context19.next = 12;
          break;

        case 8:
          _context19.prev = 8;
          _context19.t0 = _context19["catch"](0);
          console.error("Error retrieving users:", _context19.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 12:
        case "end":
          return _context19.stop();
      }
    }
  }, null, null, [[0, 8]]);
};

exports.getMotherRegisteredPerDay = function _callee20(req, res) {
  var registrations, result;
  return regeneratorRuntime.async(function _callee20$(_context20) {
    while (1) {
      switch (_context20.prev = _context20.next) {
        case 0:
          registrations = {}; // Declare the registrations object outside the try block

          _context20.prev = 1;
          _context20.next = 4;
          return regeneratorRuntime.awrap(User.aggregate([{
            $match: {
              role: "mother"
            } // Add a $match stage to filter users with role "mother"

          }, {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$registrationDate"
                }
              },
              count: {
                $sum: 1
              }
            }
          }, {
            $sort: {
              _id: 1
            }
          }]));

        case 4:
          result = _context20.sent;
          // The result will be an array of objects with the format { _id: 'yyyy-mm-dd', count: <number> }
          // Convert the array of objects into an object with dates as keys and counts as values
          // result.forEach((item) => {
          //   registrations[item._id] = item.count;
          // });
          // Send the registrations object as the response
          res.json({
            data: result
          });
          _context20.next = 12;
          break;

        case 8:
          _context20.prev = 8;
          _context20.t0 = _context20["catch"](1);
          console.log(registrations);
          res.status(500).json({
            error: "Server error"
          });

        case 12:
        case "end":
          return _context20.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getPregnantRegisteredPerDay = function _callee21(req, res) {
  var registrations, result;
  return regeneratorRuntime.async(function _callee21$(_context21) {
    while (1) {
      switch (_context21.prev = _context21.next) {
        case 0:
          registrations = {}; // Declare the registrations object outside the try block

          _context21.prev = 1;
          _context21.next = 4;
          return regeneratorRuntime.awrap(User.aggregate([{
            $match: {
              role: "pregnant"
            } // Add a $match stage to filter users with role "mother"

          }, {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$registrationDate"
                }
              },
              count: {
                $sum: 1
              }
            }
          }, {
            $sort: {
              _id: 1
            }
          }]));

        case 4:
          result = _context21.sent;
          // Convert the array of objects into an object with dates as keys and counts as values
          // result.forEach((item) => {
          //   registrations[item._id] = item.count;
          // });
          // Send the registrations object as the response
          res.json({
            data: result
          });
          _context21.next = 11;
          break;

        case 8:
          _context21.prev = 8;
          _context21.t0 = _context21["catch"](1);
          res.status(500).json({
            error: "Server error"
          });

        case 11:
        case "end":
          return _context21.stop();
      }
    }
  }, null, null, [[1, 8]]);
};

exports.getSellerRegisteredPerDay = function _callee22(req, res) {
  var registrations, result;
  return regeneratorRuntime.async(function _callee22$(_context22) {
    while (1) {
      switch (_context22.prev = _context22.next) {
        case 0:
          registrations = {}; // Declare the registrations object outside the try block

          _context22.prev = 1;
          _context22.next = 4;
          return regeneratorRuntime.awrap(User.aggregate([{
            $match: {
              role: "seller"
            } // Add a $match stage to filter users with role "mother"

          }, {
            $group: {
              _id: {
                $dateToString: {
                  format: "%Y-%m-%d",
                  date: "$registrationDate"
                }
              },
              count: {
                $sum: 1
              }
            }
          }, {
            $sort: {
              _id: 1
            }
          }]));

        case 4:
          result = _context22.sent;
          // Convert the array of objects into an object with dates as keys and counts as values
          // result.forEach((item) => {
          //   registrations[item._id] = item.count;
          // });
          // Send the registrations object as the response
          res.json({
            data: result
          });
          _context22.next = 11;
          break;

        case 8:
          _context22.prev = 8;
          _context22.t0 = _context22["catch"](1);
          res.status(500).json({
            error: "Server error"
          });

        case 11:
        case "end":
          return _context22.stop();
      }
    }
  }, null, null, [[1, 8]]);
};