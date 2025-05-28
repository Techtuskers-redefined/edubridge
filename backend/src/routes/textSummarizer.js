const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { summarizeText, summarizeFile } = require('../controllers/textSummarizerController');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Routes
router.post('/text', summarizeText);
router.post('/file', upload.single('file'), summarizeFile);

module.exports = router; 