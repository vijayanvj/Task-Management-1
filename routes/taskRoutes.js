
const express = require('express');
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const protect = require('../middleware/authMiddleware');
const {
  validateTask,
  validationResults,
} = require('../middleware/validationMiddleware');

const router = express.Router();

// Route to get all tasks for the authenticated user
router.get('/', getTasks);

// Route to create a new task
router.post('/', protect, validateTask, validationResults, createTask);

// Route to update an existing task by ID
router.put('/:id', protect, validateTask, validationResults, updateTask);

// Route to delete a task by ID
router.delete('/:id', protect, deleteTask);

module.exports = router;
