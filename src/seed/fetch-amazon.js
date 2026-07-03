require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { fetchAndStoreProducts, updateAllAmazonAffiliateLinks } = require('../services/amazon-fetcher.service');

async function main() {
  await connectDB();

  const args = process.argv.slice(2);
  const mode = args[0] || 'fetch';

  if (mode === 'update-links') {
    console.log('Updating all Amazon affiliate links...');
    const updated = await updateAllAmazonAffiliateLinks();
    console.log(`Updated ${updated} products`);
  } else {
    console.log('Fetching products from Amazon and generating dynamic data...');
    const result = await fetchAndStoreProducts();
    console.log(`\nFinal Result — Inserted: ${result.inserted}, Skipped: ${result.skipped}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
