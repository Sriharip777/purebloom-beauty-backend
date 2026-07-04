import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import ProtectedRoute from './ProtectedRoute';
import PageLoader from '../components/ui/PageLoader';

const HomePage = lazy(() => import('../pages/public/HomePage'));
const CategoriesPage = lazy(() => import('../pages/public/CategoriesPage'));
const CategoryProductsPage = lazy(() => import('../pages/public/CategoryProductsPage'));
const ProductDetailsPage = lazy(() => import('../pages/public/ProductDetailsPage'));
const TrendingPage = lazy(() => import('../pages/public/TrendingPage'));
const BestSellersPage = lazy(() => import('../pages/public/BestSellersPage'));
const SearchResultsPage = lazy(() => import('../pages/public/SearchResultsPage'));
const WishlistPage = lazy(() => import('../pages/public/WishlistPage'));
const AboutPage = lazy(() => import('../pages/public/AboutPage'));
const ContactPage = lazy(() => import('../pages/public/ContactPage'));
const PrivacyPolicyPage = lazy(() => import('../pages/public/PrivacyPolicyPage'));
const AffiliateDisclosurePage = lazy(() => import('../pages/public/AffiliateDisclosurePage'));

const AdminLoginPage = lazy(() => import('../pages/admin/AdminLoginPage'));
const ForgotPasswordPage = lazy(() => import('../pages/admin/ForgotPasswordPage'));
const ResetPasswordPage = lazy(() => import('../pages/admin/ResetPasswordPage'));
const ChangePasswordPage = lazy(() => import('../pages/admin/ChangePasswordPage'));
const AdminDashboardPage = lazy(() => import('../pages/admin/AdminDashboardPage'));
const ManageProductsPage = lazy(() => import('../pages/admin/ManageProductsPage'));
const ManageCategoriesPage = lazy(() => import('../pages/admin/ManageCategoriesPage'));
const AnalyticsPage = lazy(() => import('../pages/admin/AnalyticsPage'));
const SubscribersPage = lazy(() => import('../pages/admin/SubscribersPage'));
const ContactMessagesPage = lazy(() => import('../pages/admin/ContactMessagesPage'));

const NotFoundPage = lazy(() => import('../pages/public/NotFoundPage'));

function PageTransition({ children }) {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SuspenseWrapper({ children }) {
  return (
    <Suspense fallback={<PageLoader />}>
      <PageTransition>{children}</PageTransition>
    </Suspense>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<SuspenseWrapper><HomePage /></SuspenseWrapper>} />
        <Route path="categories" element={<SuspenseWrapper><CategoriesPage /></SuspenseWrapper>} />
        <Route path="categories/:slug" element={<SuspenseWrapper><CategoryProductsPage /></SuspenseWrapper>} />
        <Route path="products/:slug" element={<SuspenseWrapper><ProductDetailsPage /></SuspenseWrapper>} />
        <Route path="trending" element={<SuspenseWrapper><TrendingPage /></SuspenseWrapper>} />
        <Route path="best-sellers" element={<SuspenseWrapper><BestSellersPage /></SuspenseWrapper>} />
        <Route path="search" element={<SuspenseWrapper><SearchResultsPage /></SuspenseWrapper>} />
        <Route path="wishlist" element={<SuspenseWrapper><WishlistPage /></SuspenseWrapper>} />
        <Route path="about" element={<SuspenseWrapper><AboutPage /></SuspenseWrapper>} />
        <Route path="contact" element={<SuspenseWrapper><ContactPage /></SuspenseWrapper>} />
        <Route path="privacy-policy" element={<SuspenseWrapper><PrivacyPolicyPage /></SuspenseWrapper>} />
        <Route path="affiliate-disclosure" element={<SuspenseWrapper><AffiliateDisclosurePage /></SuspenseWrapper>} />
      </Route>

      <Route path="/admin/login" element={<SuspenseWrapper><AdminLoginPage /></SuspenseWrapper>} />
      <Route path="/admin/forgot-password" element={<SuspenseWrapper><ForgotPasswordPage /></SuspenseWrapper>} />
      <Route path="/admin/reset-password/:token" element={<SuspenseWrapper><ResetPasswordPage /></SuspenseWrapper>} />

      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<SuspenseWrapper><AdminDashboardPage /></SuspenseWrapper>} />
        <Route path="change-password" element={<SuspenseWrapper><ChangePasswordPage /></SuspenseWrapper>} />
        <Route path="products" element={<SuspenseWrapper><ManageProductsPage /></SuspenseWrapper>} />
        <Route path="categories" element={<SuspenseWrapper><ManageCategoriesPage /></SuspenseWrapper>} />
        <Route path="analytics" element={<SuspenseWrapper><AnalyticsPage /></SuspenseWrapper>} />
        <Route path="subscribers" element={<SuspenseWrapper><SubscribersPage /></SuspenseWrapper>} />
        <Route path="messages" element={<SuspenseWrapper><ContactMessagesPage /></SuspenseWrapper>} />
      </Route>

      <Route path="*" element={<SuspenseWrapper><NotFoundPage /></SuspenseWrapper>} />
    </Routes>
  );
}
