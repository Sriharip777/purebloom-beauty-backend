require('dotenv').config({ path: require('path').join(__dirname, '../../.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AdminUser = require('../models/AdminUser');
const Category = require('../models/Category');
const Product = require('../models/Product');
const ContactMessage = require('../models/ContactMessage');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');
const connectDB = require('../config/db');

const slugify = (name) => name.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

const categories = [
  { name: 'Face Care', slug: slugify('Face Care'), description: 'Luxurious face care products for radiant skin', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600', order: 1 },
  { name: 'Skincare Essentials', slug: slugify('Skincare Essentials'), description: 'Daily skincare must-haves', image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38d34?w=600', order: 2 },
  { name: 'Hair Care', slug: slugify('Hair Care'), description: 'Premium hair care for beautiful locks', image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600', order: 3 },
  { name: 'Makeup', slug: slugify('Makeup'), description: 'Clean beauty makeup collection', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600', order: 4 },
  { name: 'Body Care', slug: slugify('Body Care'), description: 'Nourishing body care essentials', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', order: 5 },
  { name: 'Fragrance', slug: slugify('Fragrance'), description: 'Captivating fragrances for every mood', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', order: 6 },
  { name: 'Natural & Organic', slug: slugify('Natural & Organic'), description: 'Pure, natural beauty products', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', order: 7 },
  { name: 'Beauty Tools', slug: slugify('Beauty Tools'), description: 'Professional beauty tools and accessories', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600', order: 8 },
];

const products = [
  { title: 'Hydrating Glow Serum with Vitamin C', shortDescription: 'Brightening vitamin C serum for radiant skin', description: 'A lightweight, fast-absorbing vitamin C serum that brightens, evens skin tone, and boosts collagen production for a luminous complexion. Infused with hyaluronic acid and vitamin E for deep hydration.', price: 1899, originalPrice: 2499, category: 0, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600', rating: 4.8, reviewCount: 342, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example1', isTrending: true, isBestSeller: true, tags: ['vitamin c', 'glow', 'serum'] },
  { title: 'Retinol Night Repair Cream', shortDescription: 'Anti-aging night cream with retinol', description: 'Advanced retinol night cream that reduces fine lines, wrinkles, and uneven texture while you sleep. Enriched with peptides and ceramides for skin barrier repair.', price: 2499, originalPrice: 3499, category: 0, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38d34?w=600', rating: 4.7, reviewCount: 256, brand: 'DermaGlow', affiliateUrl: 'https://www.amazon.in/dp/example2', isBestSeller: true, isDeal: true, tags: ['retinol', 'night cream', 'anti-aging'] },
  { title: 'Rose Water Hydrating Toner', shortDescription: 'Natural rose water toner for balanced skin', description: 'Pure rose water toner that balances pH, tightens pores, and refreshes skin. Made from hand-picked organic rose petals with no added chemicals.', price: 699, originalPrice: 999, category: 1, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.9, reviewCount: 567, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example3', isTrending: true, tags: ['rose water', 'toner', 'natural'] },
  { title: 'Hyaluronic Acid Moisturizer', shortDescription: 'Deep hydration hyaluronic acid cream', description: 'A deeply hydrating moisturizer with triple-weight hyaluronic acid that plumps and smooths. Lightweight yet intensely moisturizing for all skin types.', price: 1599, originalPrice: 1999, category: 1, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.6, reviewCount: 423, brand: 'SkinQuench', affiliateUrl: 'https://www.amazon.in/dp/example4', isBestSeller: true, tags: ['hyaluronic acid', 'moisturizer', 'hydration'] },
  { title: 'Argan Oil Hair Repair Mask', shortDescription: 'Deep conditioning hair mask with argan oil', description: 'Intensive hair repair mask with organic argan oil and keratin. Restores damaged hair, reduces frizz, and adds brilliant shine for silky, healthy-looking locks.', price: 1299, originalPrice: 1799, category: 2, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600', rating: 4.7, reviewCount: 389, brand: 'HairLuxe', affiliateUrl: 'https://www.amazon.in/dp/example5', isTrending: true, isDeal: true, tags: ['argan oil', 'hair mask', 'repair'] },
  { title: 'Sulfate-Free Volumizing Shampoo', shortDescription: 'Gentle volumizing shampoo for all hair types', description: 'A sulfate-free, paraben-free shampoo that gently cleanses while adding volume and body. Enriched with biotin and rice protein for thicker-looking hair.', price: 899, originalPrice: 1299, category: 2, image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=600', rating: 4.5, reviewCount: 678, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example6', tags: ['shampoo', 'volumizing', 'sulfate-free'] },
  { title: 'Matte Liquid Lipstick Set', shortDescription: 'Long-wear matte liquid lipstick - 6 shades', description: 'A set of 6 highly-pigmented, long-wearing matte liquid lipsticks. Creamy formula that dries down to a comfortable matte finish without drying lips.', price: 1499, originalPrice: 2499, category: 3, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600', rating: 4.8, reviewCount: 890, brand: 'ColorPop', affiliateUrl: 'https://www.amazon.in/dp/example7', isBestSeller: true, tags: ['lipstick', 'matte', 'makeup'] },
  { title: 'Full Coverage Foundation SPF 20', shortDescription: 'Flawless full-coverage foundation with SPF', description: 'A full-coverage, buildable foundation with SPF 20 protection. Lightweight feel with a natural finish that lasts up to 16 hours. Available in 12 shades.', price: 2199, originalPrice: 2999, category: 3, image: 'https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=600', rating: 4.6, reviewCount: 543, brand: 'GloSkin', affiliateUrl: 'https://www.amazon.in/dp/example8', isTrending: true, tags: ['foundation', 'spf', 'coverage'] },
  { title: 'Whipped Body Butter - Shea & Cocoa', shortDescription: 'Rich whipped body butter for soft skin', description: 'Ultra-rich whipped body butter made with shea butter, cocoa butter, and coconut oil. Deeply moisturizes and leaves skin silky smooth with a subtle warm vanilla scent.', price: 999, originalPrice: 1399, category: 4, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.9, reviewCount: 712, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example9', isBestSeller: true, isDeal: true, tags: ['body butter', 'shea', 'moisturizer'] },
  { title: 'Exfoliating Body Scrub - Coffee & Sugar', shortDescription: 'Natural exfoliating scrub for smooth skin', description: 'Invigorating body scrub with finely ground coffee, brown sugar, and coconut oil. Buffs away dead skin cells, improves circulation, and reveals smoother, glowing skin.', price: 799, originalPrice: 1199, category: 4, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.7, reviewCount: 456, brand: 'BodyLove', affiliateUrl: 'https://www.amazon.in/dp/example10', tags: ['body scrub', 'exfoliating', 'coffee'] },
  { title: 'Eau de Parfum - Blooming Jasmine', shortDescription: 'Enchanting jasmine-based floral fragrance', description: 'A captivating eau de parfum with top notes of jasmine and rose, heart of tuberose, and base of sandalwood and musk. Long-lasting and elegant for any occasion.', price: 3499, originalPrice: 4499, category: 5, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=600', rating: 4.8, reviewCount: 234, brand: 'AuraScents', affiliateUrl: 'https://www.amazon.in/dp/example11', isTrending: true, tags: ['perfume', 'jasmine', 'floral'] },
  { title: 'Natural Vitamin C Face Wash', shortDescription: 'Brightening vitamin C face wash', description: 'Gentle foaming face wash enriched with vitamin C, licorice extract, and aloe vera. Removes impurities while brightening and evening skin tone.', price: 599, originalPrice: 899, category: 0, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.5, reviewCount: 890, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example12', tags: ['face wash', 'vitamin c', 'brightening'] },
  { title: 'Under-Eye Brightening Cream', shortDescription: 'Reduce dark circles and puffiness', description: 'Targeted under-eye cream with caffeine, peptides, and vitamin K. Reduces dark circles, depuffs, and brightens the delicate eye area for a refreshed look.', price: 1199, originalPrice: 1699, category: 1, image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=600', rating: 4.6, reviewCount: 345, brand: 'EyeRevive', affiliateUrl: 'https://www.amazon.in/dp/example13', isDeal: true, tags: ['eye cream', 'brightening', 'dark circles'] },
  { title: 'Leave-In Hair Conditioner Spray', shortDescription: 'Detangling leave-in conditioner spray', description: 'Lightweight leave-in conditioner spray that detangles, hydrates, and protects hair from heat damage. Infused with argan oil and silk proteins for smooth, frizz-free hair.', price: 799, originalPrice: 1099, category: 2, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600', rating: 4.4, reviewCount: 567, brand: 'SilkStrand', affiliateUrl: 'https://www.amazon.in/dp/example14', tags: ['leave-in', 'conditioner', 'hair'] },
  { title: 'Eyeshadow Palette - Warm Neutrals', shortDescription: '12-shade warm neutral eyeshadow palette', description: 'A versatile 12-shade eyeshadow palette with warm neutrals, rich browns, and shimmering golds. Highly pigmented, blendable formula for endless day-to-night looks.', price: 1899, originalPrice: 2599, category: 3, image: 'https://images.unsplash.com/photo-1583241800697-733d4a5f3bc9?w=600', rating: 4.7, reviewCount: 678, brand: 'ColorPop', affiliateUrl: 'https://www.amazon.in/dp/example15', isBestSeller: true, tags: ['eyeshadow', 'palette', 'makeup'] },
  { title: 'Organic Coconut Oil Hair Serum', shortDescription: 'Pure organic coconut oil hair serum', description: 'Lightweight hair serum with organic coconut oil and vitamin E. Tames flyaways, adds shine, and protects against heat styling without weighing hair down.', price: 699, originalPrice: 999, category: 2, image: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=600', rating: 4.5, reviewCount: 432, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example16', tags: ['hair serum', 'coconut oil', 'shine'] },
  { title: 'SPF 50 Sunscreen - Water Resistant', shortDescription: 'Water-resistant sunscreen with SPF 50', description: 'Broad-spectrum SPF 50 sunscreen that is water-resistant for up to 80 minutes. Lightweight, non-greasy formula with aloe vera and vitamin E for skin protection.', price: 899, originalPrice: 1299, category: 1, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.6, reviewCount: 789, brand: 'SunGuard', affiliateUrl: 'https://www.amazon.in/dp/example17', isTrending: true, tags: ['sunscreen', 'spf', 'protection'] },
  { title: 'Lip Balm Set - 4 Flavors', shortDescription: 'Natural lip balm variety pack', description: 'Set of 4 nourishing lip balms in strawberry, vanilla, mint, and coconut. Made with beeswax, shea butter, and jojoba oil for soft, hydrated lips.', price: 499, originalPrice: 799, category: 3, image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=600', rating: 4.8, reviewCount: 921, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example18', isBestSeller: true, tags: ['lip balm', 'natural', 'set'] },
  { title: 'Rose Quartz Face Roller', shortDescription: 'Natural rose quartz facial roller', description: 'Handcrafted rose quartz facial roller that reduces puffiness, improves circulation, and enhances product absorption. Cool, soothing massage for a radiant complexion.', price: 899, originalPrice: 1299, category: 7, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600', rating: 4.7, reviewCount: 567, brand: 'CrystalGlow', affiliateUrl: 'https://www.amazon.in/dp/example19', isTrending: true, tags: ['face roller', 'rose quartz', 'tool'] },
  { title: 'Charcoal Detox Face Mask', shortDescription: 'Deep pore cleansing charcoal mask', description: 'Purifying charcoal face mask that draws out impurities, unclogs pores, and absorbs excess oil. Infused with green tea and tea tree oil for a refreshed, matte finish.', price: 799, originalPrice: 1199, category: 0, image: 'https://images.unsplash.com/photo-1570194065650-d99fb4b38d34?w=600', rating: 4.5, reviewCount: 654, brand: 'DetoxBeauty', affiliateUrl: 'https://www.amazon.in/dp/example20', isDeal: true, tags: ['charcoal', 'mask', 'detox'] },
  { title: 'Jade Gua Sha Tool', shortDescription: 'Traditional jade gua sha for facial massage', description: 'Authentic jade gua sha tool for lymphatic drainage facial massage. Lifts, contours, and sculpts the face while reducing tension and promoting glowing skin.', price: 699, originalPrice: 999, category: 7, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600', rating: 4.6, reviewCount: 345, brand: 'CrystalGlow', affiliateUrl: 'https://www.amazon.in/dp/example21', tags: ['gua sha', 'jade', 'facial'] },
  { title: 'Organic Green Tea Face Mist', shortDescription: 'Refreshing green tea face mist', description: 'Hydrating face mist with organic green tea, cucumber, and aloe vera. Perfect for a midday refresh, setting makeup, or soothing irritated skin.', price: 599, originalPrice: 849, category: 1, image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600', rating: 4.7, reviewCount: 432, brand: 'PureBloom', affiliateUrl: 'https://www.amazon.in/dp/example22', tags: ['face mist', 'green tea', 'refreshing'] },
  { title: 'Beauty Blender Makeup Sponge Set', shortDescription: 'Set of 3 precision makeup sponges', description: 'Set of 3 uniquely shaped makeup sponges for flawless foundation, concealer, and cream product application. Ultra-soft, latex-free, and designed for minimal product absorption.', price: 499, originalPrice: 799, category: 7, image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600', rating: 4.4, reviewCount: 789, brand: 'ProMakeup', affiliateUrl: 'https://www.amazon.in/dp/example23', tags: ['sponge', 'makeup', 'tool'] },
];

const contactMessages = [
  { name: 'Priya Sharma', email: 'priya.sharma@example.com', phone: '9876543210', subject: 'Product Recommendation', message: 'I am looking for a good vitamin C serum for oily skin. Can you recommend something from your collection?', status: 'new' },
  { name: 'Ananya Patel', email: 'ananya.p@example.com', phone: '8765432109', subject: 'Wholesale Inquiry', message: 'I run a beauty salon and would like to inquire about wholesale pricing for your products.', status: 'read' },
  { name: 'Rohit Verma', email: 'rohit.v@example.com', phone: '7654321098', subject: 'Order Support', message: 'I have an issue with the product I purchased through your affiliate link. Can you help?', status: 'replied' },
  { name: 'Neha Gupta', email: 'neha.g@example.com', phone: '6543210987', subject: 'Beauty Consultation', message: 'I would love a personalized beauty consultation. Can you help me build a skincare routine?', status: 'new' },
  { name: 'Kavita Reddy', email: 'kavita.r@example.com', phone: '5432109876', subject: 'Partnership Opportunity', message: 'I am a beauty influencer and would love to collaborate with PureBloom Beauty.', status: 'read' },
];

const subscribers = [
  { email: 'beautylover1@example.com', name: 'Sneha K' },
  { email: 'glowqueen@example.com', name: 'Meera R' },
  { email: 'skincarefan@example.com', name: 'Divya M' },
  { email: 'makeupartist@example.com', name: 'Aisha S' },
  { email: 'naturalglow@example.com', name: 'Pooja L' },
];

async function seed() {
  try {
    await connectDB();

    await AdminUser.deleteMany({});
    await Category.deleteMany({});
    await Product.deleteMany({});
    await ContactMessage.deleteMany({});
    await NewsletterSubscriber.deleteMany({});

    const admin = await AdminUser.create({
      name: 'PureBloom Admin',
      email: process.env.ADMIN_EMAIL || 'srihariharipechettis@gmail.com',
      password: process.env.ADMIN_PASSWORD || 'PureBloomAdmin2026',
      role: 'superadmin',
    });
    console.log(`Admin created: ${admin.email}`);

    const createdCategories = [];
    for (const cat of categories) {
      createdCategories.push(await Category.create(cat));
    }
    console.log(`${createdCategories.length} categories created`);

    const createdProducts = [];
    for (const p of products) {
      createdProducts.push(await Product.create({ ...p, category: createdCategories[p.category]._id }));
    }
    console.log(`${createdProducts.length} products created`);

    const createdMessages = [];
    for (const msg of contactMessages) createdMessages.push(await ContactMessage.create(msg));
    console.log(`${createdMessages.length} contact messages created`);

    const createdSubscribers = [];
    for (const sub of subscribers) createdSubscribers.push(await NewsletterSubscriber.create(sub));
    console.log(`${createdSubscribers.length} subscribers created`);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
}

seed();
