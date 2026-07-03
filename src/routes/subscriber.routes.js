const express = require('express');
const router = express.Router();
const { subscribe, getSubscribers, deleteSubscriber } = require('../controllers/subscriber.controller');
const { protect } = require('../middleware/auth');

router.post('/', subscribe);
router.get('/', protect, getSubscribers);
router.delete('/:id', protect, deleteSubscriber);

module.exports = router;
