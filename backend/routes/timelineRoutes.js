const express = require('express');
const router = express.Router();
const timelineController = require('../controllers/timelineController');

// GET /api/timeline - Get all timeline entries
router.get('/', timelineController.getAll);

// GET /api/timeline/:id - Get timeline entry by ID
router.get('/:id', timelineController.getById);

// POST /api/timeline - Create new timeline entry
router.post('/', timelineController.create);

// PUT /api/timeline/:id - Update timeline entry
router.put('/:id', timelineController.update);

// DELETE /api/timeline/:id - Delete timeline entry
router.delete('/:id', timelineController.delete);

module.exports = router;