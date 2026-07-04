import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryAPI } from '../../services/api';
import PageLoader from '../../components/ui/PageLoader';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    categoryAPI.getAll()
      .then((res) => setCategories(res.data.categories))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Browse</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-navy">All Categories</h1>
          <p className="mt-4 text-navy/50 font-sans text-sm max-w-md mx-auto">
            Explore our curated beauty categories and find your perfect products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <Link to={`/categories/${cat.slug}`} className="group block relative aspect-[3/4] rounded-2xl overflow-hidden card-shadow card-shadow-hover">
                <img
                  src={cat.image || 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400'}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h2 className="font-serif text-xl lg:text-2xl text-white">{cat.name}</h2>
                  <p className="text-xs text-white/60 font-sans mt-1">{cat.productCount || 0} products</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
