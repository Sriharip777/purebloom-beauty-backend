import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX, HiOutlineStar, HiOutlineExternalLink } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { productAPI, whatsappAPI } from '../../services/api';

export default function QuickViewModal({ product, open, onClose }) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  if (!product) return null;

  const handleAffiliateClick = async () => {
    try {
      await productAPI.trackClick(product._id);
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = () => {
    whatsappAPI.track({ productId: product._id, productTitle: product.title, page: 'quick_view_modal' }).catch(() => {});
    window.open(
      `https://wa.me/919999999999?text=Hi PureBloom Beauty, I am interested in this product: ${product.title}`,
      '_blank'
    );
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-navy40" />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="relative bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 bg-white flex items-center justify-center hover:bg-cream-100 transition-colors">
              <HiOutlineX size="18" className="text-navy" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="relative aspect-square md:aspect-auto md:h-full min-h-[300px] bg-cream-50 overflow-hidden">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <p className="text-[10px] text-navy-400 uppercase tracking-[0.15em] font-sans font-medium mb-1">
                  {product.category?.name || product.brand}
                </p>
                <h2 className="font-serif text-xl lg:text-2xl text-navy mb-3 leading-tight">{product.title}</h2>

                <div className="flex items-center gap-2 mb-4">
                  <HiOutlineStar size="14" className="text-amber-400 fill-current" />
                  <span className="text-sm font-medium text-navy font-sans">{product.rating}</span>
                  <span className="text-xs text-navy-400 font-sans">({product.reviewCount})</span>
                </div>

                <p className="text-sm text-navy-600 leading-relaxed font-sans mb-4">{product.shortDescription || product.description?.slice(0, 120)}</p>

                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-2xl text-navy">Rs{product.price.toLocaleString()}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-navy-300 line-through font-sans">Rs{product.originalPrice.toLocaleString()}</span>
                  )}
                  {discount > 0 && (
                    <span className="text-xs font-bold text-rose bg-rose-50 px-2 py-0.5 font-sans">{discount}% OFF</span>
                  )}
                </div>

                <div className="space-y-2.5">
                  <button onClick={handleAffiliateClick} className="w-full btn-primary text-[10px] py-3">
                    <HiOutlineExternalLink size="13" className="mr-2" />
                    View on Amazon
                  </button>
                  <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-navytext-white text-[10px] font-medium tracking-[0.12em] uppercase hover:bg-navy-800 transition-all duration-300">
                    <FaWhatsapp size="13" />
                    Ask on WhatsApp
                  </button>
                  <button
                    onClick={() => isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product)}
                    className="w-full text-xs font-sans text-navy-400 hover:text-navy py-2 transition-colors"
                  >
                    {isInWishlist(product._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
