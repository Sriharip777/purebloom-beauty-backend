import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineX } from 'react-icons/hi';

const offers = [
  'FREE SHIPPING ON ORDERS OVER ₹999',
  'NEW: GLOW SERUM COLLECTION JUST DROPPED',
  'USE CODE PURE10 FOR 10% OFF YOUR FIRST ORDER',
];

function getTimeRemaining() {
  const now = new Date();
  const end = new Date(now);
  end.setHours(23, 59, 59, 999);
  const diff = end - now;
  const h = Math.floor(diff / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export default function TopStrip() {
  const [visible, setVisible] = useState(true);
  const [offerIndex, setOfferIndex] = useState(0);
  const [countdown, setCountdown] = useState(getTimeRemaining);

  const nextOffer = useCallback(() => {
    setOfferIndex((prev) => (prev + 1) % offers.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextOffer, 5000);
    return () => clearInterval(interval);
  }, [nextOffer]);

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getTimeRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!visible) return null;

  return (
    <motion.div
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-bloom-300 text-navy text-[10px] font-sans tracking-[0.15em] uppercase"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-9 gap-3">
          <div className="relative h-4 overflow-hidden flex-1 text-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={offerIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 flex items-center justify-center tracking-[0.12em]"
              >
                {offers[offerIndex]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="hidden sm:inline-block font-medium text-navy/70">{countdown}</span>
          <button onClick={() => setVisible(false)} className="text-navy/50 hover:text-navy transition-colors ml-2">
            <HiOutlineX size="14" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
