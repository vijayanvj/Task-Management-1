
const Task = require('../models/Task');

const getTasks = async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
  console.log(tasks)
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({
    user: req.user._id,
    title,
    description,
  });
  const createdTask = await task.save();
  res.status(201).json(createdTask);
};

const updateTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const task = await Task.findById(req.params.id);

  if (task) {
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Task.deleteOne({ _id: task._id });
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};
