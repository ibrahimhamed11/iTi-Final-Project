"use strict";

var Vaccination = require('../Models/vaccination');

var User = require('../Models/Users');

exports.getVaccineById = function _callee(req, res) {
  var vaccinationId, vaccine;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          vaccinationId = req.params.vaccinationId;
          _context.next = 3;
          return regeneratorRuntime.awrap(Vaccination.findById(vaccinationId));

        case 3:
          vaccine = _context.sent;
          console.log(vaccine);
          res.send({
            data: vaccine
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllVaccines = function _callee2(req, res) {
  var vaccines;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Vaccination.find());

        case 2:
          vaccines = _context2.sent;
          res.send(vaccines);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}; //new vaccination and push this to all mothers have babies
// exports.createVaccination = async (req, res) => {
//   try {
//     const { name, date, min, max, delete_time } = req.body;
//     // Save the vaccine in  vaccination schema 
//       // Find all users with the role 'mother'
//       const users = await User.find({ role: 'mother' });
//       if (users.length === 0) {
//         return res.status(404).json({ error: 'No users with the role "mother" found' });
//       }
//       // Iterate through each user and add the new vaccination to their baby profiles
//       for (const user of users) {
//         // Check if the user has any baby information
//         if (!user.profile.babyInfo || user.profile.babyInfo.length === 0) {
//           continue; // Skip this user and move to the next one
//         }
//         // Iterate through each baby info and add the new vaccination
//         for (const babyInfo of user.profile.babyInfo) {
//           // Check if the age of the vaccination is less than the baby's age
//           if (babyInfo.age < max) {
//             // Create a new vaccination object
//             const newVaccination = new Vaccination({
//               name,
//               date,
//               min,
//               max,
//               delete_time
//             });
//             // Add the new vaccination to the baby's profile
//             babyInfo.vaccination.push(newVaccination);
//           }          // Save the updated user object
//           await user.save();
//         }
//         res.status(201).json({ message: 'Vaccination added to all babies of users with the role "mother"', status: 201 });
//       }
//     } catch (error) {
//     console.error('Error creating vaccination:', error);
//     res.status(500).json({ error: 'Internal error' });
//   }
// };
//new controller to save in schema 


exports.createVaccination = function _callee3(req, res) {
  var _req$body, name, date, min, max, delete_time, vaccination, users, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, user, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, babyInfo, newVaccination;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, name = _req$body.name, date = _req$body.date, min = _req$body.min, max = _req$body.max, delete_time = _req$body.delete_time; // Save the vaccine in the vaccination schema

          vaccination = new Vaccination({
            name: name,
            date: date,
            min: min,
            max: max,
            delete_time: delete_time
          }); // Save the vaccination object

          _context3.next = 5;
          return regeneratorRuntime.awrap(vaccination.save());

        case 5:
          _context3.next = 7;
          return regeneratorRuntime.awrap(User.find({
            role: 'mother'
          }));

        case 7:
          users = _context3.sent;

          if (!(users.length === 0)) {
            _context3.next = 10;
            break;
          }

          return _context3.abrupt("return", res.status(404).json({
            error: 'No users with the role "mother" found'
          }));

        case 10:
          // Iterate through each user and add the new vaccination to their baby profiles
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context3.prev = 13;
          _iterator = users[Symbol.iterator]();

        case 15:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context3.next = 43;
            break;
          }

          user = _step.value;

          if (!(!user.profile.babyInfo || user.profile.babyInfo.length === 0)) {
            _context3.next = 19;
            break;
          }

          return _context3.abrupt("continue", 40);

        case 19:
          // Iterate through each baby info and add the new vaccination
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context3.prev = 22;

          for (_iterator2 = user.profile.babyInfo[Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            babyInfo = _step2.value;

            // Check if the age of the vaccination is less than the baby's age
            if (babyInfo.age < max) {
              // Create a new vaccination object
              newVaccination = {
                name: name,
                date: date,
                min: min,
                max: max,
                delete_time: delete_time
              }; // Add the new vaccination to the baby's profile

              babyInfo.vaccination.push(newVaccination);
            }
          } // Save the updated user object


          _context3.next = 30;
          break;

        case 26:
          _context3.prev = 26;
          _context3.t0 = _context3["catch"](22);
          _didIteratorError2 = true;
          _iteratorError2 = _context3.t0;

        case 30:
          _context3.prev = 30;
          _context3.prev = 31;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 33:
          _context3.prev = 33;

          if (!_didIteratorError2) {
            _context3.next = 36;
            break;
          }

          throw _iteratorError2;

        case 36:
          return _context3.finish(33);

        case 37:
          return _context3.finish(30);

        case 38:
          _context3.next = 40;
          return regeneratorRuntime.awrap(user.save());

        case 40:
          _iteratorNormalCompletion = true;
          _context3.next = 15;
          break;

        case 43:
          _context3.next = 49;
          break;

        case 45:
          _context3.prev = 45;
          _context3.t1 = _context3["catch"](13);
          _didIteratorError = true;
          _iteratorError = _context3.t1;

        case 49:
          _context3.prev = 49;
          _context3.prev = 50;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 52:
          _context3.prev = 52;

          if (!_didIteratorError) {
            _context3.next = 55;
            break;
          }

          throw _iteratorError;

        case 55:
          return _context3.finish(52);

        case 56:
          return _context3.finish(49);

        case 57:
          res.status(201).json({
            message: 'Vaccination added to all babies of users with the role "mother"',
            status: 201
          });
          _context3.next = 64;
          break;

        case 60:
          _context3.prev = 60;
          _context3.t2 = _context3["catch"](0);
          console.error('Error creating vaccination:', _context3.t2);
          res.status(500).json({
            error: 'Internal error'
          });

        case 64:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 60], [13, 45, 49, 57], [22, 26, 30, 38], [31,, 33, 37], [50,, 52, 56]]);
}; //------------------------------------------------------------------------------


exports.updateVaccination = function _callee4(req, res) {
  var vaccinationId, _req$body2, name, min, max, delete_time, updatedVaccination;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          vaccinationId = req.params.vaccinationId;
          _req$body2 = req.body, name = _req$body2.name, min = _req$body2.min, max = _req$body2.max, delete_time = _req$body2.delete_time;
          _context4.next = 5;
          return regeneratorRuntime.awrap(Vaccination.findOneAndUpdate({
            _id: vaccinationId
          }, {
            name: name,
            min: min,
            max: max,
            delete_time: delete_time
          }));

        case 5:
          updatedVaccination = _context4.sent;
          console.log();

          if (updatedVaccination) {
            _context4.next = 9;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Vaccination not found'
          }));

        case 9:
          res.status(200).json(updatedVaccination);
          _context4.next = 15;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 15:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; // exports.getVaccinationsForMother = async (req, res) => {
//   try {
//     const motherId = req.params.motherId;
//     const { min, max } = req.body;
//     const vaccinations = await Vaccination.find({
//       motherId,
//       babyAge: { $gte: min, $lte: max },
//     });
//     res.json(vaccinations);
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


exports.deleteVaccination = function _callee5(req, res) {
  var vaccinationId, deletedVaccination;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          vaccinationId = req.params.vaccinationId;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Vaccination.findByIdAndDelete(vaccinationId));

        case 4:
          deletedVaccination = _context5.sent;

          if (deletedVaccination) {
            _context5.next = 7;
            break;
          }

          return _context5.abrupt("return", res.status(404).json({
            error: 'Vaccination not found'
          }));

        case 7:
          res.status(200).json({
            message: 'Vaccination deleted successfully'
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
};