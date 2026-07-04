const mongoose = require('mongoose');

const clickAnalyticsSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['affiliate', 'whatsapp', 'contact', 'newsletter'],
    required: [true, 'Click type is required'],
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  productTitle: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  categoryName: String,
  referrer: {
    type: String,
    default: '',
  },
  userAgent: String,
  ip: String,
  metadata: mongoose.Schema.Types.Mixed,
}, { timestamps: true });

module.exports = mongoose.model('ClickAnalytics', clickAnalyticsSchema);
