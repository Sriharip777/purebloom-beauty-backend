const express = require('express');
const router = express.Router();
const { fetchAndStoreProducts, updateAllAmazonAffiliateLinks } = require('../services/amazon-fetcher.service');
const { protect } = require('../middleware/auth');

router.post('/fetch', protect, async (req, res) => {
  try {
    const result = await fetchAndStoreProducts();
    res.json({ success: true, message: `Products fetched. Inserted: ${result.inserted}, Skipped: ${result.skipped}`, result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/update-links', protect, async (req, res) => {
  try {
    const updated = await updateAllAmazonAffiliateLinks();
    res.json({ success: true, message: `${updated} products updated` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
