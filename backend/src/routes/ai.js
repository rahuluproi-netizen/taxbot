const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadKnowledge, askQuery } = require('../controllers/aiController');
const { protect, authorize } = require('../middleware/authMiddleware');

// Setup Multer for PDF uploads (Temporary storage)
const upload = multer({ dest: 'uploads/' });

// Public/Client routes
router.post('/query', askQuery);

// CA/Admin routes for knowledge base management
router.post('/upload', protect, authorize('CA', 'Admin'), upload.single('file'), uploadKnowledge);

module.exports = router;
