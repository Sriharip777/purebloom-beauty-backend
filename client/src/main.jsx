import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './context/ToastContext';
import './styles/index.css';

function ThemeInitializer({ children }) {
  const [isInitialized, setIsInitialized] = useState(false);

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
      setIsInitialized(true);
    } catch (e) {
      setIsInitialized(true);
    }
  }, []);

  if (!isInitialized) {
    return <div className="min-h-screen bg-white" />;
  }

  return children;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <WishlistProvider>
          <ToastProvider>
              <ThemeInitializer>
                <App />
              </ThemeInitializer>
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#1a1a2e',
                    color: '#fff',
                    borderRadius: '12px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '14px',
                  },
                  success: { iconTheme: { primary: '#b8d4e3', secondary: '#1a1a2e' } },
                }}
              />
          </ToastProvider>
        </WishlistProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
