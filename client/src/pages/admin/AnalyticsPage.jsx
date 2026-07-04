import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { analyticsAPI } from '../../services/api';
import { HiOutlineChartBar, HiOutlineCursorClick, HiOutlineMail, HiOutlineUsers, HiOutlineTrendingUp } from 'react-icons/hi';
import { FaWhatsapp } from 'react-icons/fa';

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    analyticsAPI.get()
      .then((res) => setAnalytics(res.data.analytics))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-12"><div className="w-10 h-10 border-4 border-navy/20 border-t-navy rounded-full animate-spin mx-auto" /></div>;

  const summaryCards = [
    { label: 'Affiliate Clicks', value: analytics?.totalAffiliateClicks || 0, icon: HiOutlineCursorClick, color: 'bg-bloom-100 text-bloom-600' },
    { label: 'WhatsApp Clicks', value: analytics?.totalWhatsappClicks || 0, icon: FaWhatsapp, color: 'bg-green-50 text-green-600' },
    { label: 'Contact Submissions', value: analytics?.totalContactSubmissions || 0, icon: HiOutlineMail, color: 'bg-cream-200 text-navy' },
    { label: 'Newsletter Subscribers', value: analytics?.totalNewsletterSubscribers || 0, icon: HiOutlineUsers, color: 'bg-bloom-100 text-bloom-600' },
  ];

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-serif text-2xl lg:text-3xl text-navy mb-2">Analytics</h1>
        <p className="text-sm text-navy/40 font-sans mb-8">Track your platform performance</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {summaryCards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="bg-white rounded-2xl card-shadow p-5">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon size="18" />
              </div>
              <p className="font-serif text-2xl text-navy">{card.value.toLocaleString()}</p>
              <p className="text-xs text-navy/40 font-sans mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl card-shadow p-6">
            <h3 className="font-serif text-lg text-navy mb-4 flex items-center gap-2">
              <HiOutlineTrendingUp size="18" className="text-bloom-500" /> Top Products
            </h3>
            {analytics?.topClickedProducts?.length > 0 ? (
              <div className="space-y-3">
                {analytics.topClickedProducts.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                    <span className="text-sm font-sans text-navy truncate max-w-[250px]">{item._id || 'Unknown'}</span>
                    <span className="text-sm font-sans text-navy/60 font-medium">{item.count} clicks</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-navy/30 font-sans">No data yet</p>}
          </div>

          <div className="bg-white rounded-2xl card-shadow p-6">
            <h3 className="font-serif text-lg text-navy mb-4">Top Categories</h3>
            {analytics?.topCategories?.length > 0 ? (
              <div className="space-y-3">
                {analytics.topCategories.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                    <span className="text-sm font-sans text-navy">{item._id}</span>
                    <span className="text-sm font-sans text-navy/60">{item.count} clicks</span>
                  </div>
                ))}
              </div>
            ) : <p className="text-sm text-navy/30 font-sans">No data yet</p>}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
