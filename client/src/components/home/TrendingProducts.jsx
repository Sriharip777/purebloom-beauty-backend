import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';
import AngledSlider from '../common/AngledSlider';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ trending: 'true', limit: 12 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const sliderItems = products.map((p) => ({
    id: p._id,
    url: p.images?.[0] || p.image || 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&auto=format&fit=crop&q=60',
    alt: p.title,
    title: p.title,
    to: `/products/${p.slug}`,
  }));

  return (
    <section className="py-24 lg:py-28 bg-cream-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="section-label">Trending Now</p>
            <h2 className="section-title">Just Dropped</h2>
          </div>
          <Link to="/trending" className="hidden sm:inline-flex btn-underline text-[10px]">
            View All
          </Link>
        </motion.div>
      </div>

      {loading ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square shimmer-bg rounded-2xl" />
                <div className="pt-3 space-y-2">
                  <div className="h-3 shimmer-bg w-1/3" />
                  <div className="h-4 shimmer-bg w-3/4" />
                  <div className="h-3 shimmer-bg w-1/4" />
                  <div className="h-4 shimmer-bg w-1/3 mt-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <AngledSlider
          items={sliderItems}
          speed={30}
          direction="left"
          containerHeight="380px"
          cardWidth="280px"
          gap="32px"
          angle={18}
          hoverScale={1.06}
        />
      )}
    </section>
  );
}


