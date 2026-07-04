import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('purebloom_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('purebloom_token');
      localStorage.removeItem('purebloom_user');
      if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (data) => API.post('/auth/login', data),
  getMe: () => API.get('/auth/me'),
  forgotPassword: (data) => API.post('/auth/forgot-password', data),
  resetPassword: (token, data) => API.post(`/auth/reset-password/${token}`, data),
  changePassword: (data) => API.post('/auth/change-password', data),
};

export const productAPI = {
  getAll: (params) => API.get('/products', { params }),
  getBySlug: (slug) => API.get(`/products/slug/${slug}`),
  getById: (id) => API.get(`/products/${id}`),
  create: (data) => API.post('/products', data),
  update: (id, data) => API.put(`/products/${id}`, data),
  delete: (id) => API.delete(`/products/${id}`),
  trackClick: (productId) => API.post(`/products/${productId}/click`),
};

export const categoryAPI = {
  getAll: () => API.get('/categories'),
  getBySlug: (slug) => API.get(`/categories/${slug}`),
  create: (data) => API.post('/categories', data),
  update: (id, data) => API.put(`/categories/${id}`, data),
  delete: (id) => API.delete(`/categories/${id}`),
};

export const contactAPI = {
  send: (data) => API.post('/contact', data),
  getAll: (params) => API.get('/contact', { params }),
  updateStatus: (id, data) => API.patch(`/contact/${id}/status`, data),
};

export const analyticsAPI = {
  get: () => API.get('/analytics'),
  track: (data) => API.post('/analytics/track', data),
};

export const subscriberAPI = {
  subscribe: (data) => API.post('/subscribers', data),
  getAll: (params) => API.get('/subscribers', { params }),
  delete: (id) => API.delete(`/subscribers/${id}`),
};

export const whatsappAPI = {
  track: (data) => API.post('/whatsapp/track', data),
  getAnalytics: () => API.get('/whatsapp/analytics'),
};

export const dashboardAPI = {
  getStats: () => API.get('/dashboard/stats'),
};

export default API;
