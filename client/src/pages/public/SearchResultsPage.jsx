import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { productAPI } from '../../services/api';
import ProductGrid from '../../components/common/ProductGrid';
import PageLoader from '../../components/ui/PageLoader';

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) { setLoading(false); return; }
    setLoading(true);
    productAPI.getAll({ search: query, limit: 50 })
      .then((res) => setProducts(res.data.products))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <PageLoader />;

  return (
    <div className="py-16 lg:py-24 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-12">
          <h1 className="font-serif text-3xl lg:text-5xl text-navy">Search Results</h1>
          <p className="mt-2 text-navy/50 font-sans text-sm">
            {products.length} result{products.length !== 1 ? 's' : ''} for "{query}"
          </p>
        </motion.div>
        {!query ? (
          <div className="text-center py-16">
            <p className="font-serif text-xl text-navy/40">Enter a search term to find products</p>
          </div>
        ) : (
          <ProductGrid products={products} loading={false} />
        )}
      </div>
    </div>
  );
}
