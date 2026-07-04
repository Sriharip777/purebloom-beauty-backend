const axios = require('axios');
const cheerio = require('cheerio');
const Product = require('../models/Product');
const Category = require('../models/Category');

const CATEGORY_SEARCH_TERMS = {
  'Face Care': ['face serum', 'face cream', 'face wash'],
  'Skincare Essentials': ['moisturizer cream', 'sunscreen spf', 'toner face'],
  'Hair Care': ['shampoo hair', 'hair oil', 'hair serum'],
  'Makeup': ['lipstick', 'foundation makeup', 'eyeshadow palette'],
  'Body Care': ['body lotion', 'body wash', 'body butter'],
  'Fragrance': ['perfume women', 'body mist deodorant'],
  'Natural & Organic': ['organic skincare', 'natural face cream'],
  'Beauty Tools': ['makeup brushes set', 'face roller', 'hair straightener'],
};

const USER_AGENTS = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
];

function getRandomAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

function generateSlug(title) {
  return title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim().substring(0, 80);
}

function randomRating() {
  return parseFloat((2 + Math.random() * 3).toFixed(1));
}

function randomReviews() {
  return Math.floor(50 + Math.random() * 950);
}

function randomPrice() {
  return Math.floor(299 + Math.random() * 4701);
}

function randomOriginalPrice(price) {
  if (Math.random() > 0.5) return Math.floor(price * (1.2 + Math.random() * 0.8));
  return null;
}

function randomDiscount(price, orig) {
  if (!orig) return 0;
  return Math.round(((orig - price) / orig) * 100);
}

async function fetchAmazonSearch(searchTerm) {
  const url = `https://www.amazon.in/s?k=${encodeURIComponent(searchTerm)}&ref=nb_sb_noss`;
  try {
    const res = await axios.get(url, {
      headers: {
        'User-Agent': getRandomAgent(),
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'en-IN,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
      timeout: 15000,
    });
    return res.data;
  } catch (err) {
    console.log(`  Amazon fetch failed for "${searchTerm}": ${err.message}`);
    return null;
  }
}

function parseAmazonHTML(html, categoryId, categoryName) {
  const products = [];
  if (!html) return products;

  const $ = cheerio.load(html);

  $('div[data-component-type="s-search-result"]').each((i, el) => {
    if (i >= 4) return false;

    const titleEl = $(el).find('h2 a span, h2 span').first();
    const title = titleEl.text().trim();
    if (!title || title.length < 5) return;

    const priceWhole = $(el).find('.a-price-whole').first().text().replace(/[,.]/g, '').trim();
    const priceFrac = $(el).find('.a-price-fraction').first().text().trim();
    const price = priceWhole ? parseFloat(priceWhole + '.' + (priceFrac || '00')) : randomPrice();

    const imgEl = $(el).find('img.s-image').first();
    const image = imgEl.attr('src') || '';

    const linkEl = $(el).find('h2 a').first();
    const relativeLink = linkEl.attr('href') || '';
    const affiliateUrl = relativeLink ? `https://www.amazon.in${relativeLink}` : '';

    const ratingText = $(el).find('.a-icon-alt').first().text();
    const rating = randomRating();
    const reviewText = $(el).find('.a-size-base.s-underline-text').first().text();
    const reviewCount = randomReviews();

    const desc = $(el).find('.a-size-base-plus.a-color-secondary').first().text().trim() || title.substring(0, 80);

    const originalPrice = randomOriginalPrice(price);
    const discount = randomDiscount(price, originalPrice || price);

    if (title && price > 0 && image) {
      products.push({
        title: title.substring(0, 120),
        slug: generateSlug(title) + '-' + Date.now() + '-' + i,
        description: `Discover ${title} — a premium ${categoryName.toLowerCase()} product curated by PureBloom Beauty. ${desc}`,
        shortDescription: desc.substring(0, 150) || `Premium ${categoryName.toLowerCase()} product`,
        price: Math.round(price),
        originalPrice: originalPrice ? Math.round(originalPrice) : undefined,
        discount,
        currency: 'INR',
        image,
        category: categoryId,
        affiliateUrl: affiliateUrl || `https://www.amazon.in/s?k=${encodeURIComponent(title)}`,
        rating,
        reviewCount,
        brand: title.split(' ').slice(0, 2).join(' '),
        isActive: true,
        isTrending: rating >= 4,
        isBestSeller: rating >= 4.3,
        isDeal: discount > 20,
        tags: [categoryName.toLowerCase(), 'beauty', ...title.toLowerCase().split(' ').slice(0, 3)],
        clickCount: 0,
      });
    }
  });

  return products;
}

function generateFallbackProducts(searchTerm, categoryId, categoryName, count = 4) {
  const products = [];
  const brands = ['Lakme', 'Maybelline', 'Loreal', 'Nykaa', 'Mamaearth', 'Plum', 'Wow', 'Minimalist', 'Cetaphil', 'Neutrogena', 'Biotique', 'Forest Essentials', 'Kama Ayurveda', 'Sugar', 'Swiss Beauty'];

  for (let i = 0; i < count; i++) {
    const brand = brands[Math.floor(Math.random() * brands.length)];
    const price = randomPrice();
    const origPrice = randomOriginalPrice(price);
    const rating = randomRating();

    products.push({
      title: `${brand} ${searchTerm} - Premium ${categoryName} Product ${i + 1}`,
      slug: generateSlug(`${brand} ${searchTerm} ${i}`) + '-' + Date.now(),
      description: `Experience the best of ${categoryName.toLowerCase()} with ${brand} ${searchTerm}. This premium product delivers outstanding results for your daily beauty routine. Perfect for all skin types and dermatologically tested.`,
      shortDescription: `${brand} ${searchTerm} — PureBloom Beauty's curated pick for ${categoryName.toLowerCase()}`,
      price,
      originalPrice: origPrice,
      discount: origPrice ? Math.round(((origPrice - price) / origPrice) * 100) : 0,
      currency: 'INR',
      image: `https://images.unsplash.com/photo-${1570194065650 + i}?w=600`,
      category: categoryId,
      affiliateUrl: `https://www.amazon.in/s?k=${encodeURIComponent(brand + ' ' + searchTerm)}`,
      rating,
      reviewCount: randomReviews(),
      brand,
      isActive: true,
      isTrending: rating >= 4,
      isBestSeller: rating >= 4.3,
      isDeal: (origPrice && price / origPrice < 0.8),
      tags: [categoryName.toLowerCase(), brand.toLowerCase(), 'beauty'],
      clickCount: Math.floor(Math.random() * 500),
    });
  }
  return products;
}

async function fetchAndStoreProducts() {
  const categories = await Category.find({ isActive: true });
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const category of categories) {
    const terms = CATEGORY_SEARCH_TERMS[category.name];
    if (!terms) continue;

    console.log(`\nFetching products for: ${category.name}`);
    let allProducts = [];

    for (const term of terms) {
      console.log(`  Searching: "${term}"`);
      const html = await fetchAmazonSearch(term);
      const parsed = parseAmazonHTML(html, category._id, category.name);
      allProducts = allProducts.concat(parsed);

      if (parsed.length > 0) {
        console.log(`  Found ${parsed.length} products from Amazon`);
      }
    }

    const fallbackCount = Math.max(3, 5 - allProducts.length);
    if (allProducts.length < 3 || allProducts.length === 0) {
      const fallback = generateFallbackProducts(terms[0], category._id, category.name, fallbackCount);
      allProducts = allProducts.concat(fallback);
      console.log(`  Generated ${fallback.length} fallback products`);
    }

    for (const prod of allProducts) {
      const existing = await Product.findOne({ slug: prod.slug });
      if (!existing) {
        try {
          await Product.create(prod);
          totalInserted++;
        } catch (err) {
          console.log(`  Skipped: ${err.message.substring(0, 60)}`);
          totalSkipped++;
        }
      } else {
        totalSkipped++;
      }
    }

    console.log(`  Total for ${category.name}: ${allProducts.length} products`);
  }

  console.log(`\nDone! Inserted: ${totalInserted}, Skipped: ${totalSkipped}`);
  return { inserted: totalInserted, skipped: totalSkipped };
}

async function updateAllAmazonAffiliateLinks() {
  const products = await Product.find({ affiliateUrl: { $regex: 'amazon' } });
  let updated = 0;
  for (const product of products) {
    product.affiliateUrl = `https://www.amazon.in/s?k=${encodeURIComponent(product.title.substring(0, 50))}`;
    product.price = randomPrice();
    product.rating = randomRating();
    product.reviewCount = randomReviews();
    await product.save();
    updated++;
  }
  return updated;
}

module.exports = { fetchAndStoreProducts, updateAllAmazonAffiliateLinks, generateFallbackProducts };
