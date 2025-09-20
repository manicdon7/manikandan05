const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonialController');

// GET /api/testimonials - Get all testimonials
router.get('/', testimonialController.getAll);

// GET /api/testimonials/:id - Get testimonial by ID
router.get('/:id', testimonialController.getById);

// POST /api/testimonials - Create new testimonial
router.post('/', testimonialController.create);

// PUT /api/testimonials/:id - Update testimonial
router.put('/:id', testimonialController.update);

// DELETE /api/testimonials/:id - Delete testimonial
router.delete('/:id', testimonialController.delete);

module.exports = router;