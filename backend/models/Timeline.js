const mongoose = require('mongoose');

const timelineSchema = new mongoose.Schema({
  year: {
    type: String,
    required: true,
    trim: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  skills: [{
    type: String,
    trim: true
  }],
  type: {
    type: String,
    enum: ['work', 'education'],
    default: 'work'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Timeline', timelineSchema);