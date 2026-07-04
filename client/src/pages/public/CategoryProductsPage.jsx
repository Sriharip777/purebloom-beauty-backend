import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { categoryAPI, productAPI } from '../../services/api';
import ProductGrid from '../../components/common/ProductGrid';
import PageLoader from '../../components/ui/PageLoader';

export default function CategoryProductsPage() {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      categoryAPI.getBySlug(slug),
      productAPI.getAll({ category: undefined, limit: 50 }),
    ]).then(([catRes, prodRes]) => {
      setCategory(catRes.data.category);
      const filtered = prodRes.data.products.filter(
        (p) => p.category?.slug === slug || p.category?._id === catRes.data.category?._id
      );
      setProducts(filtered.length > 0 ? filtered : prodRes.data.products.filter(p => {
        const catId = typeof p.category === 'object' ? p.category?._id : p.category;
        return catId === catRes.data.category?._id;
      }));
    }).catch(() => {})
    .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return <PageLoader />;

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-2">Category</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-navy">{category?.name || 'Products'}</h1>
          {category?.description && (
            <p className="mt-3 text-navy/50 font-sans text-sm max-w-lg">{category.description}</p>
          )}
        </motion.div>

        <ProductGrid products={products} loading={loading} />
      </div>
    </div>
  );
}
