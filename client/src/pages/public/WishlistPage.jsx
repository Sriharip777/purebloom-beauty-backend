import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/common/ProductCard';

export default function WishlistPage() {
  const { wishlist, clearWishlist, count } = useWishlist();

  return (
    <div className="py-16 lg:py-24 bg-cream-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="flex items-center justify-between mb-12">
          <div>
            <h1 className="font-serif text-3xl lg:text-5xl text-navy">Your Wishlist</h1>
            <p className="mt-2 text-navy/50 font-sans text-sm">{count} saved item{count !== 1 ? 's' : ''}</p>
          </div>
          {count > 0 && (
            <button onClick={clearWishlist} className="text-xs text-navy/40 hover:text-red-500 font-sans underline underline-offset-2 transition-colors">
              Clear All
            </button>
          )}
        </motion.div>

        {count === 0 ? (
          <div className="text-center py-20">
            <p className="font-serif text-2xl text-navy/40 mb-4">Your wishlist is empty</p>
            <p className="text-sm text-navy/30 font-sans mb-8">Save your favorite products to find them easily later</p>
            <Link to="/categories" className="btn-primary text-xs">Browse Products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product, i) => (
              <ProductCard key={product._id} product={product} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
