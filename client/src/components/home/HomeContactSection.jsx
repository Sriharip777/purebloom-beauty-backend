import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HiOutlineMail } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappAPI } from '../../services/api';

export default function HomeContactSection() {
  const handleWhatsApp = () => {
    whatsappAPI.track({ page: 'home_contact_section' }).catch(() => {});
    window.open(
      'https://wa.me/919999999999?text=Hi PureBloom Beauty, I want to know more about your beauty recommendations.',
      '_blank'
    );
  };

  return (
    <section className="py-24 lg:py-28 bg-cream-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get in Touch</p>
          <h2 className="section-title">
            We'd Love to <span className="italic">Hear</span> From You
          </h2>
          <p className="section-subtitle mx-auto">
            Have a question about a product, need a beauty recommendation, or just want to say hello? We are here for you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/contact" className="btn-primary text-[10px] group">
            <HiOutlineMail className="mr-2" size="14" />
            Send a Message
          </Link>
          <button onClick={handleWhatsApp} className="btn-outline text-[10px] flex items-center gap-2">
            <FaWhatsapp size="14" />
            Chat on WhatsApp
          </button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-navy-300 text-xs font-sans"
        >
          Or email us directly at{' '}
          <a href="mailto:srihariharipechettis@gmail.com" className="text-navy-500 hover:text-navy underline underline-offset-2 transition-colors">
            srihariharipechettis@gmail.com
          </a>
        </motion.p>
      </div>
    </section>
  );
}
