import { useState } from 'react';
import { motion } from 'framer-motion';
import { subscriberAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    try {
      const res = await subscriberAPI.subscribe({ email, name });
      toast.success(res.data.message || 'Thank you for subscribing!');
      setEmail('');
      setName('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 lg:py-28 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Stay Connected</p>
          <h2 className="section-title">
            Join the PureBloom <span className="italic">Community</span>
          </h2>
          <p className="section-subtitle mx-auto">
            Subscribe to receive curated beauty picks, exclusive deals, and glowing tips straight to your inbox.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="mt-8 max-w-md mx-auto space-y-3"
        >
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name (optional)"
            className="w-full px-5 py-3 bg-cream-100 border-0 focus:ring-0 focus:outline-none font-sans text-sm text-navy placeholder:text-navy-300 transition-colors"
          />
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1 px-5 py-3 bg-cream-100 border-0 focus:ring-0 focus:outline-none font-sans text-sm text-navy placeholder:text-navy-300 transition-colors"
            />
            <button
              type="submit"
              disabled={loading}
              className="btn-primary px-6 text-[10px] disabled:opacity-50 whitespace-nowrap"
            >
              {loading ? 'Sending...' : 'Subscribe'}
            </button>
          </div>
          <p className="text-[10px] text-navy-300 font-sans">
            No spam, ever. Unsubscribe anytime.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
