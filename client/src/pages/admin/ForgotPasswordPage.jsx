import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) { toast.error('Please enter your email'); return; }
    setLoading(true);
    try {
      await authAPI.forgotPassword({ email });
      setSent(true);
      toast.success('If an account exists, a reset link has been sent.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-navy tracking-wider">PureBloom</h1>
            <p className="text-bloom-500 text-xs font-sans tracking-widest uppercase mt-1">Reset Password</p>
          </div>

          {sent ? (
            <div className="text-center">
              <p className="text-sm text-navy/60 font-sans mb-4">If an account exists with that email, we have sent a password reset link to <strong className="text-navy">{email}</strong>.</p>
              <p className="text-xs text-navy/40 font-sans mb-6">Please check your inbox and follow the instructions. The link expires in 1 hour.</p>
              <Link to="/admin/login" className="btn-primary text-xs">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" placeholder="admin@purebloom.com" />
              </div>
              <button type="submit" disabled={loading} className="w-full btn-primary text-xs py-3 disabled:opacity-50">
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          )}

          <div className="mt-4 text-center">
            <Link to="/admin/login" className="text-xs text-navy/40 hover:text-navy font-sans underline underline-offset-2 transition-colors">Back to Login</Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
