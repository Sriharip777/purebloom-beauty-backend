const express = require('express');
const router = express.Router();
const {
  getProducts, getProductBySlug, getProductById,
  createProduct, updateProduct, deleteProduct, trackAffiliateClick,
} = require('../controllers/product.controller');
const { protect } = require('../middleware/auth');

router.get('/', getProducts);
router.get('/slug/:slug', getProductBySlug);
router.get('/:id', getProductById);
router.post('/:productId/click', trackAffiliateClick);
router.post('/', protect, createProduct);
router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;
