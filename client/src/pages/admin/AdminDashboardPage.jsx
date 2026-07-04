import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { dashboardAPI } from '../../services/api';
import { HiOutlineShoppingBag, HiOutlineTag, HiOutlineMail, HiOutlineUsers, HiOutlineChartBar, HiOutlineEye, HiOutlineTrendingUp } from 'react-icons/hi';

const statCards = [
  { key: 'totalProducts', label: 'Total Products', icon: HiOutlineShoppingBag, color: 'bg-bloom-100 text-bloom-600', link: '/admin/products' },
  { key: 'totalCategories', label: 'Categories', icon: HiOutlineTag, color: 'bg-cream-200 text-navy', link: '/admin/categories' },
  { key: 'totalMessages', label: 'Messages', icon: HiOutlineMail, color: 'bg-bloom-100 text-bloom-600', link: '/admin/messages' },
  { key: 'unreadMessages', label: 'Unread', icon: HiOutlineEye, color: 'bg-red-50 text-red-500', link: '/admin/messages' },
  { key: 'totalSubscribers', label: 'Subscribers', icon: HiOutlineUsers, color: 'bg-cream-200 text-navy', link: '/admin/subscribers' },
  { key: 'totalClicks', label: 'Total Clicks', icon: HiOutlineChartBar, color: 'bg-bloom-100 text-bloom-600', link: '/admin/analytics' },
  { key: 'trendingProducts', label: 'Trending', icon: HiOutlineTrendingUp, color: 'bg-cream-200 text-navy', link: '/admin/products' },
  { key: 'todayClicks', label: "Today's Clicks", icon: HiOutlineEye, color: 'bg-bloom-100 text-bloom-600', link: '/admin/analytics' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dashboardAPI.getStats()
      .then((res) => setStats(res.data.stats))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <h1 className="font-serif text-2xl lg:text-3xl text-navy mb-2">Dashboard</h1>
        <p className="text-sm text-navy/40 font-sans mb-8">Overview of your PureBloom Beauty platform</p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <Link key={card.key} to={card.link} className="bg-white rounded-2xl card-shadow p-5 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon size="18" />
              </div>
              <p className="font-serif text-2xl text-navy">
                {loading ? '-' : (stats?.[card.key] ?? 0)}
              </p>
              <p className="text-xs text-navy/40 font-sans mt-1">{card.label}</p>
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl card-shadow p-6">
            <h3 className="font-serif text-lg text-navy mb-4">Recent Messages</h3>
            {stats?.recentMessages?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentMessages.map((msg) => (
                  <div key={msg._id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-navy font-sans">{msg.name}</p>
                      <p className="text-xs text-navy/40 font-sans truncate max-w-[200px]">{msg.subject}</p>
                    </div>
                    <span className={`text-[10px] px-2 py-1 rounded-full font-sans ${
                      msg.status === 'new' ? 'bg-bloom-100 text-bloom-700' : msg.status === 'read' ? 'bg-cream-200 text-navy/60' : 'bg-green-50 text-green-600'
                    }`}>
                      {msg.status}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-navy/30 font-sans">No messages yet</p>
            )}
          </div>

          <div className="bg-white rounded-2xl card-shadow p-6">
            <h3 className="font-serif text-lg text-navy mb-4">Recent Clicks</h3>
            {stats?.recentClicks?.length > 0 ? (
              <div className="space-y-3">
                {stats.recentClicks.map((click) => (
                  <div key={click._id} className="flex items-center justify-between py-2 border-b border-cream-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-navy font-sans">{click.productTitle || click.type}</p>
                      <p className="text-xs text-navy/30 font-sans">{new Date(click.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className="text-[10px] px-2 py-1 rounded-full bg-bloom-100 text-bloom-700 font-sans uppercase">{click.type}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-navy/30 font-sans">No clicks yet</p>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
