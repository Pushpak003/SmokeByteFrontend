import { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);
let _id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // onClick is optional — (navigate) => navigate('/somewhere')
  const add = useCallback((message, type = 'success', onClick = null) => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type, onClick }]);
  }, []);

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{
      toasts,
      remove,
      success: (msg, onClick) => add(msg, 'success', onClick),
      error:   (msg, onClick) => add(msg, 'error',   onClick),
    }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext must be inside ToastProvider');
  return ctx;
};