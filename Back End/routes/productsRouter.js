const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.post('/add', controller.addProduct);
router.get('/getAll', controller.getAllProducts);
router.get('/:id', controller.getById);
router.patch('/:id', controller.updateProduct);
router.delete('/:id', controller.delProduct);
router.delete('/delAll', controller.delAllProducts);
router.get('/:id/getrate', controller.productRate);
router.patch('/:id/addrate', controller.updateProductRate);

module.exports = router;