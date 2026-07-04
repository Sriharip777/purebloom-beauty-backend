const express = require('express');
const router = express.Router();
const { createMessage, getMessages, updateMessageStatus } = require('../controllers/contact.controller');
const { protect } = require('../middleware/auth');

router.post('/', createMessage);
router.get('/', protect, getMessages);
router.patch('/:id/status', protect, updateMessageStatus);

module.exports = router;
