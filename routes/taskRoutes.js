const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

// GET ALL TASKS
router.get('/', protect, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// CREATE A TASK
router.post('/', protect, async (req, res) => {
    try {
        const { title, description, status } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Task title is required' });
        }
        const task = new Task({
            title,
            description,
            status,
            user: req.user
        });
        const createdTask = await task.save();
        res.status(201).json(createdTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;