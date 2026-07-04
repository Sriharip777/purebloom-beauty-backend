import { motion } from 'framer-motion';

export default function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-white">
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-16 h-16 border-4 border-cream-300 border-t-navy rounded-full animate-spin mx-auto mb-6" />
          <p className="font-serif text-lg text-navy/60">PureBloom Beauty</p>
          <p className="text-xs text-navy/30 font-sans mt-1">Loading...</p>
        </motion.div>
      </div>
    </div>
  );
}
