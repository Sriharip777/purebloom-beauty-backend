import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-white">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
        <p className="font-serif text-8xl lg:text-9xl text-navy/10 font-bold">404</p>
        <h1 className="font-serif text-3xl lg:text-5xl text-navy mt-4 mb-3">Page Not Found</h1>
        <p className="text-navy/40 font-sans text-sm mb-8">The page you are looking for does not exist or has been moved.</p>
        <Link to="/" className="btn-primary text-xs">Back to Home</Link>
      </motion.div>
    </div>
  );
}
