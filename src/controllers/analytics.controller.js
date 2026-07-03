const ClickAnalytics = require('../models/ClickAnalytics');
const Product = require('../models/Product');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

exports.getAnalytics = async (req, res) => {
  try {
    const totalAffiliateClicks = await ClickAnalytics.countDocuments({ type: 'affiliate' });
    const totalWhatsappClicks = await ClickAnalytics.countDocuments({ type: 'whatsapp' });
    const totalContactSubmissions = await ContactMessage.countDocuments();
    const totalNewsletterSubscribers = await NewsletterSubscriber.countDocuments({ isActive: true });

    const topClickedProducts = await ClickAnalytics.aggregate([
      { $match: { type: 'affiliate', productTitle: { $ne: null } } },
      { $group: { _id: '$productTitle', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const topCategories = await ClickAnalytics.aggregate([
      { $match: { categoryName: { $ne: null } } },
      { $group: { _id: '$categoryName', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);

    const clicksByDay = await ClickAnalytics.aggregate([
      { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
      { $sort: { _id: -1 } },
      { $limit: 30 },
    ]);

    const recentClicks = await ClickAnalytics.find().sort({ createdAt: -1 }).limit(20).populate('product', 'title');

    res.json({
      success: true,
      analytics: {
        totalAffiliateClicks,
        totalWhatsappClicks,
        totalContactSubmissions,
        totalNewsletterSubscribers,
        topClickedProducts,
        topCategories,
        clicksByDay,
        recentClicks,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.trackClick = async (req, res) => {
  try {
    const { type, productId, productTitle, categoryName } = req.body;

    const click = await ClickAnalytics.create({
      type,
      product: productId,
      productTitle,
      categoryName,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      metadata: req.body,
    });

    if (type === 'affiliate' && productId) {
      await Product.findByIdAndUpdate(productId, { $inc: { clickCount: 1 } });
    }

    res.json({ success: true, click });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
