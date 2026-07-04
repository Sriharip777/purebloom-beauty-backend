import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Please enter email and password'); return; }
    setLoading(true);
    try {
      await login(email, password);
      toast.success('Welcome back!');
      navigate('/admin');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-10">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl text-navy tracking-wider">PureBloom</h1>
            <p className="text-bloom-500 text-xs font-sans tracking-widest uppercase mt-1">Admin Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20" placeholder="admin@purebloom.com" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy placeholder:text-navy/20" placeholder="Enter your password" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary text-xs py-3 disabled:opacity-50">
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/admin/forgot-password" className="text-xs text-navy/40 hover:text-navy font-sans underline underline-offset-2 transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
