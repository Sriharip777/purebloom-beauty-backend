const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const ClickAnalytics = require('../models/ClickAnalytics');
const { sendNewsletterWelcome } = require('../services/email.service');

exports.subscribe = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const existing = await NewsletterSubscriber.findOne({ email: email.toLowerCase() });
    if (existing) {
      if (!existing.isActive) {
        existing.isActive = true;
        await existing.save();
        return res.json({ success: true, message: 'Welcome back! You have been resubscribed.' });
      }
      return res.json({ success: true, message: 'You are already subscribed to PureBloom Beauty newsletter!' });
    }

    await NewsletterSubscriber.create({ email: email.toLowerCase(), name });

    await ClickAnalytics.create({
      type: 'newsletter',
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      metadata: { email },
    });

    try {
      await sendNewsletterWelcome(email);
    } catch (emailError) {
      console.error('Newsletter welcome email failed:', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Thank you for subscribing to PureBloom Beauty newsletter!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getSubscribers = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const total = await NewsletterSubscriber.countDocuments();
    const subscribers = await NewsletterSubscriber.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      subscribers,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteSubscriber = async (req, res) => {
  try {
    const sub = await NewsletterSubscriber.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ success: false, message: 'Subscriber not found' });
    res.json({ success: true, message: 'Subscriber removed' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
