import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineHeart } from 'react-icons/hi';
import { FaInstagram, FaPinterest, FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

const footerLinks = [
  {
    title: 'Explore',
    links: [
      { label: 'Home', to: '/' },
      { label: 'Categories', to: '/categories' },
      { label: 'Trending', to: '/trending' },
      { label: 'Best Sellers', to: '/best-sellers' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', to: '/about' },
      { label: 'Contact', to: '/contact' },
      { label: 'Privacy Policy', to: '/privacy-policy' },
      { label: 'Affiliate Disclosure', to: '/affiliate-disclosure' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Email Us', to: 'mailto:srihariharipechettis@gmail.com' },
      { label: 'WhatsApp', to: 'https://wa.me/919999999999?text=Hi PureBloom Beauty, I need support.' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white dark:bg-navy">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Link to="/" className="inline-block">
                  <span className="font-serif text-xl tracking-[0.15em]">PureBloom</span>
                  <span className="font-serif text-xl tracking-[0.15em] text-bloom-300"> Beauty</span>
                </Link>
                <p className="mt-4 text-white/40 text-sm leading-relaxed font-sans max-w-xs">
                  Curated beauty picks for your everyday glow. Discovering premium beauty products that help you shine naturally.
                </p>
                <div className="flex items-center gap-3 mt-6">
                  {[FaInstagram, FaPinterest, FaTwitter, FaFacebook, FaYoutube].map((Icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="w-8 h-8 flex items-center justify-center text-white/30 hover:text-bloom-300 transition-all duration-300"
                      aria-label="Social link"
                    >
                      <Icon size="14" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {footerLinks.map((section) => (
              <div key={section.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="font-serif text-base mb-4 text-white/80">{section.title}</h4>
                  <ul className="space-y-2.5">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        {link.to.startsWith('http') || link.to.startsWith('mailto') ? (
                          <a href={link.to} target="_blank" rel="noopener noreferrer"
                            className="text-white/30 hover:text-bloom-300 text-sm font-sans transition-colors duration-200">
                            {link.label}
                          </a>
                        ) : (
                          <Link to={link.to}
                            className="text-white/30 hover:text-bloom-300 text-sm font-sans transition-colors duration-200">
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/20 text-xs font-sans text-center sm:text-left">
              &copy; {new Date().getFullYear()} PureBloom Beauty. All rights reserved. As an Amazon Associate, we earn from qualifying purchases.
            </p>
            <div className="flex items-center gap-1 text-white/20 text-xs font-sans">
              Made with <HiOutlineHeart size="12" className="text-bloom-300" /> for beauty lovers
            </div>
          </div>
          <div className="mt-4 text-center">
            <a href="mailto:srihariharipechettis@gmail.com"
              className="text-white/15 hover:text-bloom-300 text-xs font-sans transition-colors">
              srihariharipechettis@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
