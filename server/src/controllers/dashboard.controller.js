const Product = require('../models/Product');
const Category = require('../models/Category');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const ClickAnalytics = require('../models/ClickAnalytics');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments();
    const activeProducts = await Product.countDocuments({ isActive: true });
    const totalCategories = await Category.countDocuments({ isActive: true });
    const totalMessages = await ContactMessage.countDocuments();
    const unreadMessages = await ContactMessage.countDocuments({ status: 'new' });
    const totalSubscribers = await NewsletterSubscriber.countDocuments({ isActive: true });
    const totalClicks = await ClickAnalytics.countDocuments();
    const todayClicks = await ClickAnalytics.countDocuments({
      createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) },
    });

    const trendingProducts = await Product.countDocuments({ isTrending: true });
    const bestSellerProducts = await Product.countDocuments({ isBestSeller: true });
    const dealProducts = await Product.countDocuments({ isDeal: true });

    const recentMessages = await ContactMessage.find().sort({ createdAt: -1 }).limit(5);
    const recentClicks = await ClickAnalytics.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('product', 'title');

    res.json({
      success: true,
      stats: {
        totalProducts,
        activeProducts,
        totalCategories,
        totalMessages,
        unreadMessages,
        totalSubscribers,
        totalClicks,
        todayClicks,
        trendingProducts,
        bestSellerProducts,
        dealProducts,
        recentMessages,
        recentClicks,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
