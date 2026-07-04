const express = require('express');
const router = express.Router();
const { uploadImage, uploadMultiple } = require('../controllers/upload.controller');

router.post('/', uploadImage);
router.post('/multiple', uploadMultiple);

module.exports = router;
