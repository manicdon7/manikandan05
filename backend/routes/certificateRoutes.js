const express = require('express');
const router = express.Router();
const certificateController = require('../controllers/certificateController');

// GET /api/certificates - Get all certificates
router.get('/', certificateController.getAll);

// GET /api/certificates/:id - Get certificate by ID
router.get('/:id', certificateController.getById);

// POST /api/certificates - Create new certificate
router.post('/', certificateController.create);

// PUT /api/certificates/:id - Update certificate
router.put('/:id', certificateController.update);

// DELETE /api/certificates/:id - Delete certificate
router.delete('/:id', certificateController.delete);

module.exports = router;