import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { HiOutlineStar, HiOutlineExternalLink, HiOutlineHeart, HiPlus } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { useWishlist } from '../../context/WishlistContext';
import { productAPI, whatsappAPI } from '../../services/api';
import QuickViewModal from './QuickViewModal';

const swatches = ['#1a1a1a', '#f4c6ce', '#c9a47e', '#e8437a', '#d4a574'];

export default function ProductCard({ product, index = 0, cardStyle }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const inWishlist = isInWishlist(product._id);
  const cardRef = useRef(null);

  const is3D = cardStyle === '3d';

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    if (!is3D || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleAffiliateClick = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await productAPI.trackClick(product._id);
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    whatsappAPI.track({ productId: product._id, productTitle: product.title, page: 'product_card' }).catch(() => {});
    window.open(`https://wa.me/919999999999?text=Hi PureBloom Beauty, I am interested in this product: ${product.title}`, '_blank');
  };

  const discount = product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;
  const hasSale = discount > 0;
  const brand = product.brand || product.category?.name || 'PureBloom';

  const cardInner = (
    <>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: index * 0.08 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group bg-white shadow-sm hover:shadow-2xl transition-shadow duration-500"
        style={is3D ? {
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          perspective: '800px',
        } : {}}
      >
        <Link to={`/products/${product.slug}`} className="block">
          <div
            className="relative overflow-hidden bg-cream-50"
            style={is3D ? { borderRadius: '1.25rem' } : {}}
          >
            <motion.img
              src={product.image}
              alt={product.title}
              className="w-full aspect-[3/4] object-cover"
              style={is3D ? { backfaceVisibility: 'hidden' } : {}}
              animate={{ scale: isHovered ? 1.08 : 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            />

            {is3D && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isHovered
                    ? 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%, rgba(0,0,0,0.08) 100%)'
                    : 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 40%)',
                  transition: 'background 0.4s ease',
                  borderRadius: '1.25rem',
                }}
              />
            )}

            {hasSale && (
              <span className="badge-sale">SALE</span>
            )}

            {!hasSale && product.isBestSeller && (
              <span className="badge-pink">MUST LOVE</span>
            )}

            {!hasSale && product.isTrending && (
              <span className="badge-pink">TRENDING</span>
            )}

            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); setQuickViewOpen(true); }}
              className="absolute bottom-3 right-3 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center hover:bg-navy hover:text-white transition-colors"
            >
              <HiPlus size="16" />
            </motion.button>

            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); inWishlist ? removeFromWishlist(product._id) : addToWishlist(product); }}
              className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                inWishlist ? 'bg-bloom-100 text-rose' : 'bg-white/80 text-navy-400 hover:text-rose'
              }`}
            >
              <HiOutlineHeart size="14" className={inWishlist ? 'fill-current' : ''} />
            </button>
          </div>
        </Link>

        <div className="pt-3 pb-4">
          <p className="text-[10px] text-navy-400 uppercase tracking-[0.12em] font-sans mb-1">{brand}</p>
          <Link to={`/products/${product.slug}`}>
            <h3 className="text-sm font-medium text-navy leading-snug hover:text-navy-600 transition-colors">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center gap-1.5 mt-1.5">
            <HiOutlineStar size="11" className="text-amber-400 fill-current" />
            <span className="text-[11px] text-navy-600 font-sans">{product.rating}</span>
            <span className="text-[10px] text-navy-300 font-sans">({product.reviewCount})</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span className="text-sm font-semibold text-navy">Rs{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="text-[11px] text-navy-300 line-through font-sans">Rs{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          <div className="flex items-center gap-1.5 mt-2">
            {swatches.slice(0, 4).map((color, i) => (
              <span key={i} className="w-3 h-3 rounded-full border border-cream-200" style={{ backgroundColor: color }} />
            ))}
            <span className="text-[9px] text-navy-300 font-sans ml-0.5">+</span>
          </div>

          <motion.button
            onClick={handleAffiliateClick}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="w-full mt-3 text-[10px] font-medium tracking-[0.12em] uppercase text-white py-2.5 border-t border-cream-200 transition-all flex items-center justify-center gap-1.5 relative overflow-hidden group/btn rounded-lg bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 shadow-sm hover:shadow-[0_4px_20px_rgba(16,185,129,0.35)]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <HiOutlineExternalLink size="11" /> Buy Now
            </span>
            <motion.span
              className="absolute inset-0 bg-white/15 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            />
          </motion.button>
        </div>
      </motion.div>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );

  return cardInner;
}
