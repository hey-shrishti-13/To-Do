const express = require('express');
const router = express.Router();
const Folder = require('../models/Folder');
const Task = require('../models/Task');

// Get all folders
router.get('/', async (req, res) => {
  try {
    const { sortBy = 'createdAt', order = 'desc' } = req.query;
    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const folders = await Folder.find().sort(sortObj);
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get folder by ID
router.get('/:id', async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }
    res.json(folder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create folder
router.post('/', async (req, res) => {
  try {
    const { name, label, color } = req.body;
    
    // Validation
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Folder name is required' });
    }

    const folder = new Folder({
      name: name.trim(),
      label: label ? label.trim() : '',
      color: color || '#3498db'
    });
    
    await folder.save();
    console.log('Folder created:', folder._id);
    res.status(201).json(folder);
  } catch (error) {
    console.error('Error creating folder:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to create folder',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Update folder
router.put('/:id', async (req, res) => {
  try {
    const { name, label, color } = req.body;
    const folder = await Folder.findByIdAndUpdate(
      req.params.id,
      {
        name,
        label,
        color,
        updatedAt: Date.now()
      },
      { new: true }
    );
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }
    res.json(folder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete folder
router.delete('/:id', async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ error: 'Folder not found' });
    }

    // Move folder to trash
    const Trash = require('../models/Trash');
    await Trash.create({
      type: 'folder',
      data: folder.toObject()
    });

    // Delete all tasks in this folder
    const tasks = await Task.find({ folderId: folder._id });
    for (const task of tasks) {
      await Trash.create({
        type: 'task',
        data: task.toObject()
      });
    }
    await Task.deleteMany({ folderId: folder._id });

    // Delete folder
    await Folder.findByIdAndDelete(req.params.id);
    res.json({ message: 'Folder moved to trash' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
