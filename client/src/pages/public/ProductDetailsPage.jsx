import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineStar, HiOutlineExternalLink, HiOutlineArrowLeft, HiOutlineShare } from 'react-icons/hi';
import { FaWhatsapp, FaPinterest, FaTwitter, FaFacebook } from 'react-icons/fa';
import { productAPI, whatsappAPI } from '../../services/api';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../../components/common/ProductCard';
import ProductCardSkeleton from '../../components/common/ProductCardSkeleton';

export default function ProductDetailsPage() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  useEffect(() => {
    setLoading(true);
    productAPI.getBySlug(slug)
      .then((res) => setData(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="aspect-[4/5] shimmer-bg rounded-3xl" />
            <div className="space-y-6">
              <div className="h-6 shimmer-bg rounded w-1/4" />
              <div className="h-12 shimmer-bg rounded w-3/4" />
              <div className="h-4 shimmer-bg rounded w-1/2" />
              <div className="h-24 shimmer-bg rounded" />
              <div className="h-12 shimmer-bg rounded w-1/3" />
              <div className="h-14 shimmer-bg rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data || !data.product) {
    return (
      <div className="py-20 text-center">
        <p className="font-serif text-2xl text-navy/40">Product not found</p>
        <Link to="/" className="btn-outline text-xs mt-6 inline-flex">Back to Home</Link>
      </div>
    );
  }

  const { product, related } = data;
  const inWishlist = isInWishlist(product._id);

  const handleAffiliateClick = async () => {
    try {
      await productAPI.trackClick(product._id);
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    } catch {
      window.open(product.affiliateUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleWhatsApp = () => {
    whatsappAPI.track({ productId: product._id, productTitle: product.title, page: 'product_details' }).catch(() => {});
    window.open(`https://wa.me/919999999999?text=Hi PureBloom Beauty, I am interested in this product: ${product.title}`, '_blank');
  };

  const shareUrl = window.location.href;
  const shareText = `Discover ${product.title} on PureBloom Beauty`;

  return (
    <div className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/categories" className="inline-flex items-center gap-1.5 text-xs text-navy/40 hover:text-navy font-sans mb-8 transition-colors">
            <HiOutlineArrowLeft size="14" /> Back to Categories
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-cream-50">
              <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              {(product.isTrending || product.isBestSeller || product.isDeal) && (
                <span className={`absolute top-4 left-4 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                  product.isDeal ? 'bg-red-500 text-white' : product.isBestSeller ? 'bg-navy text-white' : 'bg-bloom-200 text-navy'
                }`}>
                  {product.isDeal ? `-${product.discount}% Deal` : product.isBestSeller ? 'Best Seller' : 'Trending'}
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-2">
              {product.category?.name || product.brand}
            </p>
            <h1 className="font-serif text-3xl lg:text-5xl text-navy leading-tight mb-4">{product.title}</h1>

            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                <HiOutlineStar size="16" className="text-amber-400 fill-current" />
                <span className="text-sm font-medium text-navy font-sans">{product.rating}</span>
                <span className="text-xs text-navy/40 font-sans">({product.reviewCount} reviews)</span>
              </div>
              {product.brand && (
                <span className="text-xs text-navy/30 font-sans">by {product.brand}</span>
              )}
            </div>

            <p className="text-navy/60 font-sans leading-relaxed mb-6">{product.description}</p>

            <div className="flex items-center gap-4 mb-6">
              <span className="font-serif text-3xl lg:text-4xl text-navy">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-navy/30 line-through font-sans">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="text-sm font-bold text-red-500 bg-red-50 px-3 py-1 rounded-full font-sans">{product.discount}% OFF</span>
                </>
              )}
            </div>

            {product.ingredients?.length > 0 && (
              <div className="mb-6">
                <p className="text-xs font-medium text-navy uppercase tracking-wider font-sans mb-2">Key Ingredients</p>
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing, i) => (
                    <span key={i} className="text-xs bg-cream-50 text-navy/60 px-3 py-1.5 rounded-full font-sans">{ing}</span>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-3 mb-6">
              <button onClick={handleAffiliateClick} className="w-full btn-primary text-xs py-4">
                <HiOutlineExternalLink size="16" className="mr-2" />
                View on Amazon — ₹{product.price.toLocaleString()}
              </button>
              <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#25D366] text-white rounded-full text-xs font-medium tracking-wider uppercase hover:bg-[#20bd5a] transition-all duration-300">
                <FaWhatsapp size="16" />
                Inquire on WhatsApp
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => inWishlist ? removeFromWishlist(product._id) : addToWishlist(product)}
                  className={`w-full text-xs font-sans py-3 rounded-full border transition-all duration-300 ${
                    inWishlist ? 'bg-red-50 border-red-200 text-red-500' : 'border-cream-300 text-navy/60 hover:border-navy/30'
                  }`}
                >
                  {inWishlist ? '♥ In Wishlist' : '♡ Add to Wishlist'}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-cream-200">
              <span className="text-xs text-navy/40 font-sans">Share:</span>
              {[
                { icon: FaPinterest, url: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}` },
                { icon: FaTwitter, url: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}` },
                { icon: FaFacebook, url: `https://facebook.com/sharer/sharer.php?u=${shareUrl}` },
              ].map((s, i) => (
                <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-cream-50 flex items-center justify-center text-navy/40 hover:bg-navy hover:text-white transition-all duration-300">
                  <s.icon size="14" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {related && related.length > 0 && (
          <section className="mt-20 lg:mt-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-2xl lg:text-4xl text-navy mb-8">Related Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {related.map((p, i) => (
                  <ProductCard key={p._id} product={p} index={i} />
                ))}
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}
