const express = require('express');
const router = express.Router();
const { trackWhatsappClick, getWhatsappAnalytics } = require('../controllers/whatsapp.controller');
const { protect } = require('../middleware/auth');

router.post('/track', trackWhatsappClick);
router.get('/analytics', protect, getWhatsappAnalytics);

module.exports = router;
