const mongoose = require('mongoose');

const trashSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['task', 'folder'],
    required: true
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  deletedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Trash', trashSchema);
