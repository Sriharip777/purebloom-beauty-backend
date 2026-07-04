import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp } from 'react-icons/fa';
import { contactAPI, whatsappAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    try {
      const res = await contactAPI.send(form);
      toast.success(res.data.message || 'Message sent successfully!');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    whatsappAPI.track({ page: 'contact_page' }).catch(() => {});
    window.open('https://wa.me/919999999999?text=Hi PureBloom Beauty, I want more details about your beauty recommendations.', '_blank');
  };

  return (
    <div className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12 lg:mb-16">
          <p className="text-xs text-bloom-500 uppercase tracking-[0.2em] font-sans font-medium mb-3">Get in Touch</p>
          <h1 className="font-serif text-4xl lg:text-6xl text-navy">Contact Us</h1>
          <p className="mt-3 text-navy/50 font-sans text-sm max-w-lg mx-auto">
            Have a question, feedback, or need a beauty recommendation? We would love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Name *</label>
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20 transition-colors" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Email *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20 transition-colors" placeholder="your@email.com" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Phone</label>
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} className="w-full px-4 py-3.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20 transition-colors" placeholder="+91 98765 43210" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Subject *</label>
                  <input type="text" name="subject" value={form.subject} onChange={handleChange} className="w-full px-4 py-3.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20 transition-colors" placeholder="How can we help?" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Message *</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows="5" className="w-full px-4 py-3.5 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20 transition-colors resize-none" placeholder="Tell us more about your inquiry..." />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary text-xs py-3.5 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="space-y-8">
            <div className="bg-cream-50 rounded-2xl p-6 lg:p-8">
              <h3 className="font-serif text-xl text-navy mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-bloom-500 uppercase tracking-wider font-sans font-medium mb-1">Email</p>
                  <a href="mailto:srihariharipechettis@gmail.com" className="text-sm text-navy/70 hover:text-navy font-sans transition-colors">
                    srihariharipechettis@gmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-bloom-500 uppercase tracking-wider font-sans font-medium mb-1">Response Time</p>
                  <p className="text-sm text-navy/60 font-sans">We typically respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-[#25D366]/5 rounded-2xl p-6 lg:p-8 border border-[#25D366]/10">
              <h3 className="font-serif text-xl text-navy mb-3">Chat on WhatsApp</h3>
              <p className="text-sm text-navy/60 font-sans mb-5">
                Prefer instant messaging? Reach us on WhatsApp for quick responses.
              </p>
              <button onClick={handleWhatsApp} className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3.5 rounded-full text-xs font-medium tracking-wider uppercase hover:bg-[#20bd5a] transition-all duration-300">
                <FaWhatsapp size="16" />
                Start WhatsApp Chat
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
