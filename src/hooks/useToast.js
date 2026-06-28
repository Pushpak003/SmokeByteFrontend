import { useState, useCallback } from 'react';

let _id = 0;

export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const add = useCallback((message, type = 'success') => {
    const id = ++_id;
    setToasts(prev => [...prev, { id, message, type }]);
  }, []);

  const remove = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return {
    toasts,
    remove,
    success: (msg) => add(msg, 'success'),
    error:   (msg) => add(msg, 'error'),
  };
};