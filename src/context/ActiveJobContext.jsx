import { createContext, useContext, useState, useCallback } from 'react';

const KEY = 'smokebyte_active_job';
const ActiveJobContext = createContext(null);

export const ActiveJobProvider = ({ children }) => {
  const [jobId, setJobIdState] = useState(() => {
    try { return localStorage.getItem(KEY) || null; } catch { return null; }
  });

  const setJobId = useCallback((id) => {
    setJobIdState(id);
    try {
      if (id) localStorage.setItem(KEY, id);
      else localStorage.removeItem(KEY);
    } catch {}
  }, []);

  const clearJob = useCallback(() => setJobId(null), [setJobId]);

  return (
    <ActiveJobContext.Provider value={{ jobId, setJobId, clearJob }}>
      {children}
    </ActiveJobContext.Provider>
  );
};

export const useActiveJobContext = () => {
  const ctx = useContext(ActiveJobContext);
  if (!ctx) throw new Error('useActiveJobContext must be inside ActiveJobProvider');
  return ctx;
};