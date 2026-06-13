import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://smokebyte-backend-latest.onrender.com';

export const useServerStatus = () => {
  const [status, setStatus] = useState('checking'); // 'checking' | 'online' | 'offline'

  useEffect(() => {
    const check = async () => {
      try {
        await axios.get(`${API_URL}/health`, { timeout: 5000 });
        setStatus('online');
      } catch {
        setStatus('offline');
      }
    };

    check();
    // Re-check every 60 seconds
    const interval = setInterval(check, 60_000);
    return () => clearInterval(interval);
  }, []);

  return status;
};