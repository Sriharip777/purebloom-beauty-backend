const ClickAnalytics = require('../models/ClickAnalytics');
const Product = require('../models/Product');

const trackClick = async ({ type, productId, productTitle, categoryId, categoryName, referrer, userAgent, ip, metadata }) => {
  try {
    const click = await ClickAnalytics.create({
      type,
      product: productId,
      productTitle,
      category: categoryId,
      categoryName,
      referrer,
      userAgent,
      ip,
      metadata,
    });

    if (type === 'affiliate' && productId) {
      await Product.findByIdAndUpdate(productId, { $inc: { clickCount: 1 } });
    }

    return click;
  } catch (error) {
    console.error('Analytics tracking error:', error.message);
  }
};

const getAnalyticsSummary = async () => {
  const totalClicks = await ClickAnalytics.countDocuments();
  const affiliateClicks = await ClickAnalytics.countDocuments({ type: 'affiliate' });
  const whatsappClicks = await ClickAnalytics.countDocuments({ type: 'whatsapp' });
  const contactSubmissions = await ClickAnalytics.countDocuments({ type: 'contact' });
  const newsletterSignups = await ClickAnalytics.countDocuments({ type: 'newsletter' });

  const topProducts = await ClickAnalytics.aggregate([
    { $match: { type: 'affiliate', product: { $ne: null } } },
    { $group: { _id: '$product', title: { $first: '$productTitle' }, count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 10 },
  ]);

  const clicksByDay = await ClickAnalytics.aggregate([
    { $group: { _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } }, count: { $sum: 1 } } },
    { $sort: { _id: -1 } },
    { $limit: 30 },
  ]);

  return { totalClicks, affiliateClicks, whatsappClicks, contactSubmissions, newsletterSignups, topProducts, clicksByDay };
};

module.exports = { trackClick, getAnalyticsSummary };
