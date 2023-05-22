const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.post('/add', controller.addProduct);
router.get('/getAll', controller.getAllProducts);
router.get('/:id', controller.getById);
router.patch('/:id', controller.updateProduct);
router.delete('/:id', controller.delProduct);
router.delete('/delAll', controller.delAllProducts);

// Get product Rate
router.get('/:id/rate', controller.productRate);

module.exports = router;
