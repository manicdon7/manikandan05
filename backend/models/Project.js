const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  githubLink: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  deployment: {
    type: String,
    required: true
  },
  techStack: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', projectSchema);