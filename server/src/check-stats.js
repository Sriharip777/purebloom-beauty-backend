require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const all = await Product.find().sort({ rating: -1 }).lean();
  const stats = { min: all[all.length-1]?.rating, max: all[0]?.rating };
  const r = {};
  all.forEach(x => { const k = Math.floor(x.rating); r[k] = (r[k]||0) + 1; });
  console.log('Rating distribution:', JSON.stringify(r));
  console.log('Min rating:', stats.min, 'Max rating:', stats.max);
  console.log('Total products:', all.length);
  process.exit(0);
});
