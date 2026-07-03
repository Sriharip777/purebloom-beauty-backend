const express = require('express');
const router = express.Router();
const { getAnalytics, trackClick } = require('../controllers/analytics.controller');
const { protect } = require('../middleware/auth');

router.post('/track', trackClick);
router.get('/', protect, getAnalytics);

module.exports = router;
