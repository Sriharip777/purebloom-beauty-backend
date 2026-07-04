const express = require('express');
const router = express.Router();
const { login, getMe, forgotPassword, resetPassword, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/login', login);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.post('/change-password', protect, changePassword);

module.exports = router;
