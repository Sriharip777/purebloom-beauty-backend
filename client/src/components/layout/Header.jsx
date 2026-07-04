import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineSearch, HiOutlineHeart, HiOutlineMenu, HiOutlineX, HiOutlineUser } from 'react-icons/hi';
import { useWishlist } from '../../context/WishlistContext';
import { categoryAPI } from '../../services/api';
import { CoolThemeToggle } from '../ui/CoolThemeToggle';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Categories', to: '/categories' },
  { label: 'Trending', to: '/trending' },
  { label: 'Best Sellers', to: '/best-sellers' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

const headerVariants = {
  hidden: { y: -80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const logoVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.2 },
  },
};

const navContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.3 },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

const actionsVariants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1], delay: 0.4 },
  },
};

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [megaOpen, setMegaOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { count: wishlistCount } = useWishlist();
  const searchRef = useRef(null);
  const megaTimeout = useRef(null);

  useEffect(() => {
    categoryAPI.getAll().then((res) => setCategories(res.data.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <motion.header
      variants={headerVariants}
      initial="hidden"
      animate="visible"
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-white/90 dark:bg-navy/90 backdrop-blur-xl shadow-lg border-b border-cream-200/50 dark:border-navy-700/50'
          : 'bg-white dark:bg-navy border-b border-cream-200 dark:border-navy-700'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Brand — Left Side */}
          <motion.div variants={logoVariants} className="flex items-center gap-3 shrink-0">
            <Link to="/" className="group flex items-center gap-1">
              <span className="font-serif text-xl lg:text-2xl tracking-[0.12em] text-navy dark:text-cream transition-colors duration-300">
                Pure
              </span>
              <span className="font-serif text-xl lg:text-2xl tracking-[0.12em] text-bloom-500 dark:text-bloom-300 transition-colors duration-300">
                Bloom
              </span>
              <span className="hidden sm:inline font-serif text-lg lg:text-xl tracking-[0.12em] text-navy-300 dark:text-cream-400 ml-1 transition-colors duration-300">
                Beauty
              </span>
            </Link>
          </motion.div>

          {/* Nav Links — Center */}
          <motion.nav
            variants={navContainerVariants}
            initial="hidden"
            animate="visible"
            className="hidden lg:flex items-center gap-1"
          >
            {navLinks.map((link) => (
              <motion.div key={link.to} variants={navItemVariants}>
                {link.label === 'Categories' ? (
                  <div
                    className="relative"
                    onMouseEnter={() => { clearTimeout(megaTimeout.current); setMegaOpen(true); }}
                    onMouseLeave={() => { megaTimeout.current = setTimeout(() => setMegaOpen(false), 200); }}
                  >
                    <Link
                      to={link.to}
                      className="relative px-4 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-600 dark:text-cream-300 hover:text-bloom-500 dark:hover:text-bloom-300 transition-all duration-300 group rounded-lg hover:bg-bloom-50/60 dark:hover:bg-navy-700/60"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-bloom-400 to-rose-400 group-hover:w-3/4 transition-all duration-400 ease-out rounded-full" />
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(232,116,146,0.15)]" />
                    </Link>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: 'easeOut' }}
                          className="absolute top-full left-0 mt-3 bg-white dark:bg-navy-800 shadow-2xl border border-cream-200/60 dark:border-navy-700/60 rounded-2xl p-6 min-w-[500px] backdrop-blur-sm"
                          onMouseEnter={() => clearTimeout(megaTimeout.current)}
                          onMouseLeave={() => setMegaOpen(false)}
                        >
                          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-bloom-400 dark:text-bloom-300 mb-4">Browse Categories</p>
                          <div className="grid grid-cols-2 gap-3">
                            {categories.map((cat) => (
                              <Link
                                key={cat._id}
                                to={`/categories/${cat.slug}`}
                                className="flex items-center gap-3 p-3 rounded-xl hover:bg-bloom-50 dark:hover:bg-navy-700 transition-all duration-200 group"
                                onClick={() => setMegaOpen(false)}
                              >
                                {cat.image && (
                                  <img src={cat.image} alt={cat.name} className="w-10 h-10 rounded-lg object-cover group-hover:scale-105 transition-transform duration-200" />
                                )}
                                <div>
                                  <p className="text-sm font-medium text-navy dark:text-cream group-hover:text-bloom-600 dark:group-hover:text-bloom-300 transition-colors font-sans">{cat.name}</p>
                                  <p className="text-[10px] text-navy-400 dark:text-cream-500 font-sans">{cat.productCount || 0} products</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div variants={navItemVariants}>
                    <Link
                      to={link.to}
                      className="relative px-4 py-2 text-[11px] font-semibold tracking-[0.15em] uppercase text-navy-600 dark:text-cream-300 hover:text-bloom-500 dark:hover:text-bloom-300 transition-all duration-300 group rounded-lg hover:bg-bloom-50/60 dark:hover:bg-navy-700/60"
                    >
                      {link.label}
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-bloom-400 to-rose-400 group-hover:w-3/4 transition-all duration-400 ease-out rounded-full" />
                      <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_15px_rgba(232,116,146,0.15)]" />
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </motion.nav>

          {/* Actions — Right Side */}
          <motion.div
            variants={actionsVariants}
            className="flex items-center gap-0.5"
          >
            <CoolThemeToggle size="sm" />

            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="relative p-2.5 text-navy-400 dark:text-cream-400 hover:text-bloom-500 dark:hover:text-bloom-300 transition-all duration-300 group"
              aria-label="Search"
            >
              <HiOutlineSearch size="18" className="group-hover:scale-110 transition-transform duration-200" />
            </button>

            <Link
              to="/wishlist"
              className="relative p-2.5 text-navy-400 dark:text-cream-400 hover:text-bloom-500 dark:hover:text-bloom-300 transition-all duration-300 group"
            >
              <HiOutlineHeart size="18" className="group-hover:scale-110 transition-transform duration-200" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-bloom-500 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold animate-pulse">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/contact"
              className="hidden lg:inline-flex p-2.5 text-navy-400 dark:text-cream-400 hover:text-bloom-500 dark:hover:text-bloom-300 transition-all duration-300 group"
            >
              <HiOutlineUser size="18" className="group-hover:scale-110 transition-transform duration-200" />
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2.5 text-navy dark:text-cream hover:text-bloom-500 transition-colors"
              aria-label="Menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiOutlineX size="20" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <HiOutlineMenu size="20" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="border-t border-cream-200/50 dark:border-navy-700/50 bg-white/80 dark:bg-navy/80 backdrop-blur-xl overflow-hidden"
          >
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto px-4 py-5">
              <div className="relative">
                <HiOutlineSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-bloom-400" size="18" />
                <input
                  ref={searchRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search beauty products..."
                  className="w-full pl-12 pr-4 py-3.5 bg-cream-50 dark:bg-navy-700 border border-cream-200/50 dark:border-navy-600/50 rounded-xl focus:ring-2 focus:ring-bloom-400/30 focus:border-bloom-400 outline-none font-sans text-sm text-navy dark:text-cream placeholder:text-navy-300 dark:placeholder:text-cream-500 transition-all duration-300"
                />
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden border-t border-cream-200/50 dark:border-navy-700/50 bg-white/90 dark:bg-navy/90 backdrop-blur-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <Link
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-navy-600 dark:text-cream-300 hover:bg-bloom-50 dark:hover:bg-navy-700 hover:text-bloom-600 dark:hover:text-bloom-300 font-sans text-sm rounded-xl transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="pt-3 border-t border-cream-200/50 dark:border-navy-700/50 mt-3 space-y-1">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05, duration: 0.3 }}
                >
                  <Link to="/wishlist" onClick={() => setMobileOpen(false)} className="block px-4 py-3 text-navy-600 dark:text-cream-300 hover:bg-bloom-50 dark:hover:bg-navy-700 hover:text-bloom-600 dark:hover:text-bloom-300 font-sans text-sm rounded-xl transition-all duration-200">
                    Wishlist ({wishlistCount})
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
