const express = require('express');
const router = express.Router();
const controller  = require('../controllers/ordersController')


router.post('/add',controller.createOrder)
router.get('/getAll',controller.getAllOrders)
router.get('/:id',controller.getById)
router.patch('/:id',controller.updateOrder);
router.delete('/:id',controller.delOrder)



module.exports = router;