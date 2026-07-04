import { createContext, useContext } from 'react';
import toast from 'react-hot-toast';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const showToast = {
    success: (msg) => toast.success(msg),
    error: (msg) => toast.error(msg),
    info: (msg) => toast(msg, { icon: '✨' }),
    loading: (msg) => toast.loading(msg),
  };

  return (
    <ToastContext.Provider value={showToast}>
      {children}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
