require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  const Product = require('./models/Product');
  const Category = require('./models/Category');
  const cats = await Category.countDocuments();
  const prods = await Product.countDocuments();
  const byCat = await Product.aggregate([
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
  const allCats = await Category.find();
  const catsMap = {};
  allCats.forEach(c => catsMap[c._id.toString()] = c.name);
  console.log('Categories:', cats);
  console.log('Total Products:', prods);
  console.log('Products by category:');
  byCat.forEach(b => {
    const name = catsMap[b._id?.toString()] || 'Unknown';
    console.log('  ' + name + ': ' + b.count);
  });
  console.log('\nSample products (rating range check):');
  const samples = await Product.find().limit(5);
  samples.forEach(p => console.log('  ' + (p.title||'').substring(0,50) + ' | Rating: ' + p.rating + ' | Rs' + p.price));
  process.exit(0);
});
