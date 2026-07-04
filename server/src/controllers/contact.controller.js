const ContactMessage = require('../models/ContactMessage');
const ClickAnalytics = require('../models/ClickAnalytics');
const { sendContactNotification, sendThankYouEmail } = require('../services/email.service');

exports.createMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, subject, and message are required' });
    }

    const contactMessage = await ContactMessage.create({ name, email, phone, subject, message });

    await ClickAnalytics.create({
      type: 'contact',
      referrer: req.headers.referer || '',
      userAgent: req.headers['user-agent'],
      ip: req.ip,
      metadata: { name, email, subject },
    });

    try {
      await sendContactNotification({ name, email, phone, subject, message });
      await sendThankYouEmail(email, name);
    } catch (emailError) {
      console.error('Contact notification email failed:', emailError.message);
    }

    res.status(201).json({ success: true, message: 'Message sent successfully! We will get back to you soon.', data: contactMessage });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const query = {};
    if (status) query.status = status;

    const total = await ContactMessage.countDocuments(query);
    const messages = await ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      messages,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateMessageStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status, adminNotes },
      { new: true, runValidators: true }
    );
    if (!message) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    res.json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
