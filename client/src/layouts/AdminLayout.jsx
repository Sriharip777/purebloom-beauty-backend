import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { HiOutlineChartBar, HiOutlineShoppingBag, HiOutlineTag, HiOutlineMail, HiOutlineUsers, HiOutlineKey, HiOutlineLogout, HiOutlineMenu, HiOutlineX, HiOutlineHome, HiOutlineChartPie } from 'react-icons/hi';

const sidebarLinks = [
  { to: '/admin', icon: HiOutlineHome, label: 'Dashboard', exact: true },
  { to: '/admin/products', icon: HiOutlineShoppingBag, label: 'Products' },
  { to: '/admin/categories', icon: HiOutlineTag, label: 'Categories' },
  { to: '/admin/analytics', icon: HiOutlineChartBar, label: 'Analytics' },
  { to: '/admin/messages', icon: HiOutlineMail, label: 'Messages' },
  { to: '/admin/subscribers', icon: HiOutlineUsers, label: 'Subscribers' },
  { to: '/admin/change-password', icon: HiOutlineKey, label: 'Change Password' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-cream-50">
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-navy text-white px-4 py-3 flex items-center justify-between">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-white p-2">
          {sidebarOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
        </button>
        <Link to="/admin" className="font-serif text-lg tracking-wider">PureBloom Admin</Link>
        <button onClick={handleLogout} className="text-white/70 hover:text-white">
          <HiOutlineLogout size={20} />
        </button>
      </div>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/30" onClick={() => setSidebarOpen(false)} />
            <nav className="relative w-72 h-full bg-navy p-6 pt-20 overflow-y-auto">
              <SidebarContent links={sidebarLinks} location={location} onLogout={handleLogout} />
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col">
        <nav className="flex-1 bg-navy flex flex-col">
          <div className="px-6 py-8 border-b border-white/10">
            <Link to="/admin" className="font-serif text-2xl text-white tracking-wider">PureBloom</Link>
            <p className="text-bloom-200 text-xs mt-1 font-sans">Admin Panel</p>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-1">
            <SidebarContent links={sidebarLinks} location={location} onLogout={handleLogout} />
          </div>
        </nav>
      </div>

      <div className="lg:pl-72">
        <div className="hidden lg:flex items-center justify-between bg-white border-b border-cream-200 px-8 py-4">
          <p className="text-sm text-navy/60 font-sans">Welcome back, {user?.name || 'Admin'}</p>
          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs text-navy/50 hover:text-navy font-sans">View Site</Link>
            <button onClick={handleLogout} className="flex items-center gap-1.5 text-xs text-navy/50 hover:text-navy font-sans">
              <HiOutlineLogout size={14} /> Logout
            </button>
          </div>
        </div>
        <div className="p-6 lg:p-8 pt-20 lg:pt-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

function SidebarContent({ links, location, onLogout }) {
  return (
    <>
      {links.map((link) => {
        const isActive = link.exact
          ? location.pathname === link.to
          : location.pathname.startsWith(link.to) && link.to !== '/admin';
        return (
          <Link
            key={link.to}
            to={link.to}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-all duration-200 ${
              isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <link.icon size={18} />
            {link.label}
          </Link>
        );
      })}
      <div className="pt-4 mt-4 border-t border-white/10">
        <Link
          to="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans text-white/40 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <HiOutlineChartPie size={18} />
          Back to Site
        </Link>
      </div>
    </>
  );
}
