"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var products = require("../Models/products");

var multer = require("multer");

var date = require("date-and-time");

var User = require("../Models/Users"); // Configure multer for file storage


var fileStorage = multer.diskStorage({
  destination: function destination(req, file, callback) {
    callback(null, "./uploads/");
  },
  filename: function filename(req, file, callback) {
    var fileName = Date.now() + file.originalname.replace(/ /g, "");
    callback(null, fileName);
  }
});
exports.upload = multer({
  storage: fileStorage
});

exports.addProduct = function (req, res) {
  var _req$body = req.body,
      description = _req$body.description,
      name = _req$body.name,
      price = _req$body.price,
      category = _req$body.category,
      stock = _req$body.stock,
      rate = _req$body.rate,
      reviews = _req$body.reviews,
      seller = _req$body.seller;
  var product = new products({
    name: name,
    price: price,
    description: description,
    category: category,
    stock: stock,
    image: req.file.filename,
    rate: rate,
    reviews: reviews,
    seller: seller
  });
  product.save().then(function (product) {
    res.status(201).json(product);
  })["catch"](function (err) {
    res.send(err);
  });
}; //Get all products


exports.getAllProducts = function _callee(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(products.find());

        case 2:
          product = _context.sent;
          res.send(product);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}; //Get Seller`s products \


exports.getSellerProducts = function _callee2(req, res) {
  var _id, product;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _id = req.params.id;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(products.find({
            seller: _id
          }));

        case 4:
          product = _context2.sent;
          res.send(product);
          _context2.next = 11;
          break;

        case 8:
          _context2.prev = 8;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);

        case 11:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 8]]);
}; //Get product by it`s id


exports.getById = function _callee3(req, res) {
  var product;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(products.findById(req.params._id));

        case 2:
          product = _context3.sent;
          res.send(product);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}; //Update existing product


exports.updateProduct = function _callee4(req, res) {
  var update;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          console.log(req.body);
          _context4.next = 4;
          return regeneratorRuntime.awrap(products.findByIdAndUpdate(req.params.id, _objectSpread({}, req.body)));

        case 4:
          update = _context4.sent;
          console.log(update);
          res.send(update);
          _context4.next = 12;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.log(_context4.t0);

        case 12:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; //Delete existing product by Id


exports.delProduct = function _callee5(req, res) {
  var deleted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(products.findByIdAndDelete(req.params.id));

        case 2:
          deleted = _context5.sent;
          res.send(deleted);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; //Delete all products 


exports.delAllProducts = function _callee6(req, res) {
  var deleted;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(products.deleteMany());

        case 2:
          deleted = _context6.sent;
          res.send(deleted);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}; //Product Rate


exports.productRate = function _callee7(req, res) {
  var product, averageRate;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(products.findById(req.params.id));

        case 3:
          product = _context7.sent;

          if (product) {
            _context7.next = 6;
            break;
          }

          return _context7.abrupt("return", res.status(404).json({
            error: "Product not found"
          }));

        case 6:
          console.log("before");
          averageRate = calculateAverageRate(product.rate);
          console.log("after");
          res.json({
            averageRate: averageRate
          });
          _context7.next = 16;
          break;

        case 12:
          _context7.prev = 12;
          _context7.t0 = _context7["catch"](0);
          console.error("Error calculating average rate:", _context7.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 16:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[0, 12]]);
}; //use put or patch if user make rate update product rate
//find by id and update
//  calculate the average rate


function calculateAverageRate(rate) {
  var totalRate = 0;
  var numRate = rate.length;

  if (numRate === 0) {
    return 0;
  }

  for (var i = 0; i < numRate; i++) {
    totalRate += rate[i];
  }

  return totalRate / numRate;
} //Product Patch or update


exports.updateProductRate = function _callee8(req, res) {
  var productId, newRate, product, averageRate;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          productId = req.params.id;
          newRate = req.body.rate;
          _context8.next = 5;
          return regeneratorRuntime.awrap(products.findById(productId));

        case 5:
          product = _context8.sent;

          if (product) {
            _context8.next = 8;
            break;
          }

          return _context8.abrupt("return", res.status(404).json({
            error: "Product not found"
          }));

        case 8:
          product.rate.push(newRate);
          _context8.next = 11;
          return regeneratorRuntime.awrap(product.save());

        case 11:
          averageRate = calculateAverageRate(product.rate);
          res.json({
            averageRate: averageRate
          });
          _context8.next = 19;
          break;

        case 15:
          _context8.prev = 15;
          _context8.t0 = _context8["catch"](0);
          console.error("Error updating product rate:", _context8.t0);
          res.status(500).json({
            error: "Internal server error"
          });

        case 19:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 15]]);
};