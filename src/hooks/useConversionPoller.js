import { useEffect, useRef } from 'react';
import api from '../lib/api';

const POLL_MS      = 3000;
const MAX_404_WAIT = 10000;

// Call this at upload time so permission dialog appears BEFORE user navigates away
export const requestNotifPermission = async () => {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }
};

export const sendBrowserNotif = (title, body) => {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/logo.png' });
  }
  // Already asked at upload time — don't ask again here
};

const useConversionPoller = ({ jobId, onDone, onTick }) => {
  const intervalRef  = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    if (!jobId) return;
    startTimeRef.current = Date.now();

    const poll = async () => {
      try {
        const { data } = await api.get(`/status/${jobId}`);
        onTick?.(data.status);

        if (data.status === 'completed' || data.status === 'failed') {
          clearInterval(intervalRef.current);
          onDone?.(data);
        }
      } catch (err) {
        const status = err?.response?.status;
        if (status === 404) {
          const elapsed = Date.now() - startTimeRef.current;
          if (elapsed < MAX_404_WAIT) { onTick?.('pending'); return; }
          clearInterval(intervalRef.current);
          onDone?.({ status: 'failed', error: 'Job not found. Please try again.' });
        } else {
          clearInterval(intervalRef.current);
          onDone?.({ status: 'failed', error: 'Could not get job status.' });
        }
      }
    };

    poll();
    intervalRef.current = setInterval(poll, POLL_MS);
    return () => clearInterval(intervalRef.current);
  }, [jobId]);
};

export default useConversionPoller;