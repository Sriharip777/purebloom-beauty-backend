import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';
import ProductCard from '../common/ProductCard';

export default function BestSellersSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ bestseller: 'true', limit: 8 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-24 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="section-label">Best Sellers</p>
            <h2 className="section-title">Customer Favorites</h2>
          </div>
          <Link to="/best-sellers" className="hidden sm:inline-flex btn-underline text-[10px]">
            View All
          </Link>
        </motion.div>

        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          style={{ perspective: '1200px' }}
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-[3/4] shimmer-bg rounded-2xl" />
                  <div className="pt-3 space-y-2">
                    <div className="h-3 shimmer-bg w-1/3" />
                    <div className="h-4 shimmer-bg w-3/4" />
                    <div className="h-3 shimmer-bg w-1/4" />
                  </div>
                </div>
              ))
            : products.slice(0, 8).map((product, i) => (
                <ProductCard key={product._id} product={product} index={i} cardStyle="3d" />
              ))}
        </div>
      </div>
    </section>
  );
}
