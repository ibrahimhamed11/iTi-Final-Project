const express = require('express');
const router = express.Router();
const controller = require('../controllers/ordersController')


router.post('/add', controller.createOrder)

//app 
router.post('/addOrder', controller.createOrderApp)
router.get('/getAll', controller.getAllOrders)
router.get('/:id', controller.getById)
router.put('/:id', controller.updateOrder);
router.delete('/:id', controller.delOrder)
router.get('/user/:id', controller.getUserOrders);
router.patch('/:productId/checkRate', controller.updateCheckRate);
router.get('/seller/:sellerId', controller.getAllSellerOrders);

module.exports = router;
