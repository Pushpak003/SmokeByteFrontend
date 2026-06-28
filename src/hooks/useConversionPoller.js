import { useEffect, useRef } from 'react';
import api from '../lib/api';

const POLL_MS      = 3000;
const MAX_404_WAIT = 10000; // wait up to 10s for log to appear before giving up

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
        // pending / processing — keep polling
      } catch (err) {
        const status = err?.response?.status;

        if (status === 404) {
          // Log not created yet (worker hasn't picked up job) — keep waiting
          const elapsed = Date.now() - startTimeRef.current;
          if (elapsed < MAX_404_WAIT) {
            // Still within grace period — don't fail, just wait
            onTick?.('pending');
            return;
          }
          // Exceeded grace period — truly not found
          clearInterval(intervalRef.current);
          onDone?.({ status: 'failed', error: 'Job not found. Please try again.' });
        } else {
          // Network error or 5xx — stop polling
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

export const sendBrowserNotif = (title, body) => {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon: '/logo.png' });
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(p => {
      if (p === 'granted') new Notification(title, { body, icon: '/logo.png' });
    });
  }
};

export default useConversionPoller;