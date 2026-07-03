require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Category = require('../models/Category');
const ClickAnalytics = require('../models/ClickAnalytics');
const ContactMessage = require('../models/ContactMessage');

const app = express();
app.use(express.json());

const MCP_PORT = process.env.MCP_PORT || 4000;

const mcpMethods = {
  get_products: async (args) => {
    const { page = 1, limit = 10, category, search, trending, bestseller } = args || {};
    const query = { isActive: true };
    if (category) query.category = category;
    if (trending) query.isTrending = trending === true || trending === 'true';
    if (bestseller) query.isBestSeller = bestseller === true || bestseller === 'true';
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    const products = await Product.find(query)
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Product.countDocuments(query);
    return { success: true, products, total, page, limit };
  },

  get_product_by_slug: async (args) => {
    const { slug } = args || {};
    if (!slug) return { success: false, error: 'Slug is required' };
    const product = await Product.findOne({ slug }).populate('category', 'name slug');
    if (!product) return { success: false, error: 'Product not found' };
    return { success: true, product };
  },

  list_categories: async () => {
    const categories = await Category.find({ isActive: true }).sort({ order: 1 });
    return { success: true, categories };
  },

  add_product: async (args) => {
    if (!args || !args.title || !args.price || !args.category || !args.affiliateUrl) {
      return { success: false, error: 'title, price, category, and affiliateUrl are required' };
    }
    const product = await Product.create(args);
    return { success: true, product };
  },

  track_click: async (args) => {
    const { type, productId, productTitle, categoryName } = args || {};
    if (!type) return { success: false, error: 'type is required' };
    const click = await ClickAnalytics.create({
      type,
      product: productId,
      productTitle,
      categoryName,
      metadata: args,
    });
    if (type === 'affiliate' && productId) {
      await Product.findByIdAndUpdate(productId, { $inc: { clickCount: 1 } });
    }
    return { success: true, click };
  },

  get_analytics_summary: async () => {
    const totalClicks = await ClickAnalytics.countDocuments();
    const affiliateClicks = await ClickAnalytics.countDocuments({ type: 'affiliate' });
    const whatsappClicks = await ClickAnalytics.countDocuments({ type: 'whatsapp' });
    const topProducts = await ClickAnalytics.aggregate([
      { $match: { type: 'affiliate' } },
      { $group: { _id: '$productTitle', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]);
    return { success: true, summary: { totalClicks, affiliateClicks, whatsappClicks, topProducts } };
  },

  create_contact_message: async (args) => {
    const { name, email, subject, message } = args || {};
    if (!name || !email || !subject || !message) {
      return { success: false, error: 'name, email, subject, and message are required' };
    }
    const contact = await ContactMessage.create({ name, email, subject, message });
    return { success: true, contact };
  },
};

app.post('/mcp', async (req, res) => {
  try {
    const { method, args, id } = req.body;

    if (!method || !mcpMethods[method]) {
      return res.status(400).json({ jsonrpc: '2.0', error: { code: -32601, message: `Method '${method}' not found` }, id });
    }

    const result = await mcpMethods[method](args);
    res.json({ jsonrpc: '2.0', result, id });
  } catch (error) {
    res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: error.message }, id: req.body.id });
  }
});

app.get('/mcp/health', (req, res) => {
  res.json({ status: 'PureBloom Beauty MCP Server running', methods: Object.keys(mcpMethods) });
});

module.exports = { app, mcpMethods, MCP_PORT };
