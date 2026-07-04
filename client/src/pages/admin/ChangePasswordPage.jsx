import { useState } from 'react';
import { motion } from 'framer-motion';
import { authAPI } from '../../services/api';
import toast from 'react-hot-toast';

export default function ChangePasswordPage() {
  const [form, setForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.currentPassword || !form.newPassword) { toast.error('Fill in all fields'); return; }
    if (form.newPassword.length < 6) { toast.error('New password must be at least 6 characters'); return; }
    if (form.newPassword !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      await authAPI.changePassword({ currentPassword: form.currentPassword, newPassword: form.newPassword });
      toast.success('Password changed successfully!');
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-serif text-2xl lg:text-3xl text-navy mb-2">Change Password</h1>
        <p className="text-sm text-navy/40 font-sans mb-8">Update your admin account password</p>

        <div className="max-w-lg bg-white rounded-2xl card-shadow p-6 lg:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Current Password</label>
              <input type="password" value={form.currentPassword} onChange={(e) => setForm({ ...form, currentPassword: e.target.value })} className="w-full px-4 py-3 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">New Password</label>
              <input type="password" value={form.newPassword} onChange={(e) => setForm({ ...form, newPassword: e.target.value })} className="w-full px-4 py-3 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" placeholder="Min. 6 characters" />
            </div>
            <div>
              <label className="block text-xs font-medium text-navy/60 font-sans mb-1.5">Confirm New Password</label>
              <input type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} className="w-full px-4 py-3 bg-cream-50 rounded-xl border border-cream-200 focus:border-navy/30 focus:outline-none font-sans text-sm text-navy" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary text-xs py-3 disabled:opacity-50">
              {loading ? 'Updating...' : 'Update Password'}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
