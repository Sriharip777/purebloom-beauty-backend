const ClickAnalytics = require('../models/ClickAnalytics');

exports.trackWhatsappClick = async (req, res) => {
  try {
    const { productId, productTitle, page } = req.body;

    await ClickAnalytics.create({
      type: 'whatsapp',
      product: productId,
      productTitle,
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      metadata: { page, productTitle },
    });

    res.json({ success: true, message: 'WhatsApp click tracked' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getWhatsappAnalytics = async (req, res) => {
  try {
    const totalClicks = await ClickAnalytics.countDocuments({ type: 'whatsapp' });
    const clicksByPage = await ClickAnalytics.aggregate([
      { $match: { type: 'whatsapp' } },
      { $group: { _id: '$metadata.page', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    res.json({ success: true, analytics: { totalClicks, clicksByPage } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
