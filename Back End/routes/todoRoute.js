const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');


router.post('/add',todoController.addTask);
router.get('/getAll', todoController.getAllTasks);
router.get('/:id',todoController.getTaskById);
router.patch('/:id',todoController.editTask);
router.delete('/:id',todoController.delTask);

module.exports = router;

