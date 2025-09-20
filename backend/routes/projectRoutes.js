const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

// GET /api/projects - Get all projects
router.get('/', projectController.getAll);

// GET /api/projects/:id - Get project by ID
router.get('/:id', projectController.getById);

// POST /api/projects - Create new project
router.post('/', projectController.create);

// PUT /api/projects/:id - Update project
router.put('/:id', projectController.update);

// DELETE /api/projects/:id - Delete project
router.delete('/:id', projectController.delete);

module.exports = router;