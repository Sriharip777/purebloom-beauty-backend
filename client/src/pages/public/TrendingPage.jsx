import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';
import ProductGrid from '../../components/common/ProductGrid';
import PageLoader from '../../components/ui/PageLoader';

export default function TrendingPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productAPI.getAll({ trending: 'true', limit: 50 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="py-16 lg:py-24 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12 text-center">
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Trending Now</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-navy">Most Loved Picks</h1>
          <p className="mt-3 text-navy/50 font-sans text-sm">Discover what everyone is loving right now</p>
        </motion.div>
        <ProductGrid products={products} loading={false} />
      </div>
    </div>
  );
}
