const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
  },
  shortDescription: {
    type: String,
    trim: true,
    maxlength: 200,
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: 0,
  },
  originalPrice: {
    type: Number,
    min: 0,
  },
  currency: {
    type: String,
    default: 'INR',
  },
  image: {
    type: String,
    default: '',
  },
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  affiliateUrl: {
    type: String,
    required: [true, 'Affiliate URL is required'],
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  reviewCount: {
    type: Number,
    default: 0,
  },
  brand: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isDeal: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  tags: [String],
  ingredients: [String],
  howToUse: String,
  clickCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

productSchema.pre('save', function (next) {
  if (!this.slug) {
    this.slug = this.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  }
  if (this.originalPrice && this.originalPrice > this.price) {
    this.discount = Math.round(((this.originalPrice - this.price) / this.originalPrice) * 100);
  }
  next();
});

productSchema.index({ title: 'text', description: 'text', brand: 'text' });
productSchema.index({ category: 1 });
productSchema.index({ isTrending: 1, isBestSeller: 1, isDeal: 1 });

module.exports = mongoose.model('Product', productSchema);
