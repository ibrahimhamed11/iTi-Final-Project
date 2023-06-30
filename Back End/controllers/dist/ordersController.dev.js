"use strict";

var orders = require('../Models/orders');

exports.createOrder = function _callee(req, res) {
  var _req$body, productName, userId, productId, qty, shippingAdress, delStatus, date, order, savedOrder;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _req$body = req.body, productName = _req$body.productName, userId = _req$body.userId, productId = _req$body.productId, qty = _req$body.qty, shippingAdress = _req$body.shippingAdress, delStatus = _req$body.delStatus, date = _req$body.date;
          order = new orders({
            productName: productName,
            userId: userId,
            productId: productId,
            qty: qty,
            shippingAdress: shippingAdress,
            delStatus: delStatus,
            date: date
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(order.save());

        case 5:
          savedOrder = _context.sent;
          res.status(201).json({
            savedOrder: savedOrder,
            status: 201
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  });
};

exports.getAllOrders = function _callee2(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(orders.find());

        case 2:
          order = _context2.sent;
          res.send({
            data: order
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
};

exports.getById = function _callee3(req, res) {
  var order;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(orders.findById(req.params.id));

        case 2:
          order = _context3.sent;
          res.send(order);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
};

exports.updateOrder = function _callee4(req, res) {
  var updatedOrder;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return regeneratorRuntime.awrap(orders.findByIdAndUpdate(req.params.id, {
            delStatus: req.body.delStatus
          }, // Update the delStatus field with the new value
          {
            "new": true
          } // Return the updated order after the update is applied
          ));

        case 3:
          updatedOrder = _context4.sent;

          if (updatedOrder) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", res.status(404).json({
            error: 'Order not found'
          }));

        case 6:
          res.json(updatedOrder);
          _context4.next = 13;
          break;

        case 9:
          _context4.prev = 9;
          _context4.t0 = _context4["catch"](0);
          console.error('Error updating order:', _context4.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.delOrder = function _callee5(req, res) {
  var deleted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(orders.findByIdAndDelete(req.params.id));

        case 2:
          deleted = _context5.sent;
          res.send(deleted);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}; // Get all orders for a selected user ID


exports.getUserOrders = function _callee6(req, res) {
  var userId, userOrders;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.prev = 0;
          userId = req.params.id;
          _context6.next = 4;
          return regeneratorRuntime.awrap(orders.find({
            userId: userId
          }).populate('_id'));

        case 4:
          userOrders = _context6.sent;
          res.json(userOrders);
          _context6.next = 12;
          break;

        case 8:
          _context6.prev = 8;
          _context6.t0 = _context6["catch"](0);
          console.error('Error fetching user orders:', _context6.t0);
          res.status(500).json({
            error: 'Internal server error'
          });

        case 12:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[0, 8]]);
};