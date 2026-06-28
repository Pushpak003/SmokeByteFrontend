import { useState, useEffect } from 'react';

const KEY = 'smokebyte_active_job';

// Persists the active jobId in localStorage.
// If user navigates away and comes back, the job status is still shown.
// Job is cleared when: completed, failed, or user clicks "Convert Another".
const useActiveJob = () => {
  const [jobId, setJobIdState] = useState(() => {
    try { return localStorage.getItem(KEY) || null; } catch { return null; }
  });

  const setJobId = (id) => {
    setJobIdState(id);
    try {
      if (id) localStorage.setItem(KEY, id);
      else localStorage.removeItem(KEY);
    } catch {}
  };

  const clearJob = () => setJobId(null);

  return { jobId, setJobId, clearJob };
};

export default useActiveJob;