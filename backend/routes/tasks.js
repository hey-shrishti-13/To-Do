const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mp3|pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type'));
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const { folderId, search, sortBy = 'createdAt', order = 'desc', completed } = req.query;
    const query = {};

    if (folderId) {
      query.folderId = folderId === 'null' ? null : folderId;
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (completed !== undefined) {
      query.completed = completed === 'true';
    }

    const sortOrder = order === 'asc' ? 1 : -1;
    const sortObj = {};
    sortObj[sortBy] = sortOrder;

    const tasks = await Task.find(query).populate('folderId').sort(sortObj);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get task by ID
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('folderId');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create task
router.post('/', upload.array('media', 10), async (req, res) => {
  try {
    const { title, description, folderId, label } = req.body;
    const mediaUrls = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    const task = new Task({
      title,
      description: description || '',
      folderId: folderId === 'null' || !folderId ? null : folderId,
      label: label || '',
      media: mediaUrls
    });
    await task.save();
    await task.populate('folderId');
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task
router.put('/:id', upload.array('media', 10), async (req, res) => {
  try {
    const { title, description, folderId, label, completed } = req.body;
    const updateData = {
      updatedAt: Date.now()
    };

    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (folderId !== undefined) updateData.folderId = folderId === 'null' ? null : folderId;
    if (label !== undefined) updateData.label = label;

    if (completed !== undefined) {
      updateData.completed = completed === 'true';
      updateData.completedAt = completed === 'true' ? Date.now() : null;
    }

    if (req.files && req.files.length > 0) {
      const mediaUrls = req.files.map(file => `/uploads/${file.filename}`);
      const task = await Task.findById(req.params.id);
      updateData.media = [...(task.media || []), ...mediaUrls];
    }

    const task = await Task.findByIdAndUpdate(req.params.id, updateData, { new: true }).populate('folderId');
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Move to trash
    const Trash = require('../models/Trash');
    await Trash.create({
      type: 'task',
      data: task.toObject()
    });

    // Delete task
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: 'Task moved to trash' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
