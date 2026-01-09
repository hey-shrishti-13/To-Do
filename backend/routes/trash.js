const express = require('express');
const router = express.Router();
const Trash = require('../models/Trash');

// Get all trash items
router.get('/', async (req, res) => {
  try {
    const { type } = req.query;
    const query = type ? { type } : {};
    const trashItems = await Trash.find(query).sort({ deletedAt: -1 });
    res.json(trashItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Restore item from trash
router.post('/:id/restore', async (req, res) => {
  try {
    const trashItem = await Trash.findById(req.params.id);
    if (!trashItem) {
      return res.status(404).json({ error: 'Item not found in trash' });
    }

    if (trashItem.type === 'task') {
      const Task = require('../models/Task');
      const task = new Task(trashItem.data);
      await task.save();
    } else if (trashItem.type === 'folder') {
      const Folder = require('../models/Folder');
      const folder = new Folder(trashItem.data);
      await folder.save();
    }

    await Trash.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item restored successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Permanently delete item from trash
router.delete('/:id', async (req, res) => {
  try {
    const trashItem = await Trash.findById(req.params.id);
    if (!trashItem) {
      return res.status(404).json({ error: 'Item not found in trash' });
    }

    // Delete associated media files if task
    if (trashItem.type === 'task' && trashItem.data.media) {
      const fs = require('fs');
      const path = require('path');
      trashItem.data.media.forEach(mediaPath => {
        const filePath = path.join(__dirname, '..', mediaPath);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      });
    }

    await Trash.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item permanently deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Empty trash
router.delete('/', async (req, res) => {
  try {
    const trashItems = await Trash.find();
    
    // Delete media files
    const fs = require('fs');
    const path = require('path');
    trashItems.forEach(item => {
      if (item.type === 'task' && item.data.media) {
        item.data.media.forEach(mediaPath => {
          const filePath = path.join(__dirname, '..', mediaPath);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      }
    });

    await Trash.deleteMany({});
    res.json({ message: 'Trash emptied' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
