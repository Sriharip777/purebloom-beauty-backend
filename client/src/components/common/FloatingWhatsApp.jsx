import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { whatsappAPI } from '../../services/api';

export default function FloatingWhatsApp() {
  const handleClick = () => {
    whatsappAPI.track({ page: 'floating_button' }).catch(() => {});
    window.open(
      'https://wa.me/919999999999?text=Hi PureBloom Beauty, I want to know more about your beauty recommendations.',
      '_blank'
    );
  };

  return (
    <AnimatePresence>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-navyrounded-full flex items-center justify-center shadow-lg hover:bg-navy-800 transition-all duration-300"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp size="22" className="text-white" />
      </motion.button>
    </AnimatePresence>
  );
}
