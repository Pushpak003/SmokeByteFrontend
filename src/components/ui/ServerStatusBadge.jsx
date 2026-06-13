import { useState } from 'react';
import { useServerStatus } from '../../hooks/userServerStatus';
import './ServerStatusBadge.css';

const CONFIG = {
  checking: { dot: 'dot--pulse',  label: 'Checking…',     color: 'badge--checking' },
  online:   { dot: 'dot--online', label: 'Server Online',  color: 'badge--online'   },
  offline:  { dot: 'dot--offline',label: 'Server Offline', color: 'badge--offline'  },
};

const ServerStatusBadge = () => {
  const status = useServerStatus();
  const [open, setOpen] = useState(false);
  const { dot, label, color } = CONFIG[status];

  return (
    <div className="status-badge-wrapper">
      <button
        className={`status-badge ${color}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Server status info"
      >
        <span className={`status-dot ${dot}`} />
        {label}
      </button>

      {open && (
        <>
          <div className="status-popover-backdrop" onClick={() => setOpen(false)} />
          <div className="status-popover">
            <div className="status-popover__header">
              <span className={`status-dot ${dot}`} />
              <strong>{status === 'online' ? 'Server Online' : status === 'offline' ? 'Server Offline' : 'Checking…'}</strong>
            </div>
            <p className="status-popover__body">
              {status === 'online'
                ? 'The SmokeByte backend is up and reachable. All features — login, uploads, conversions, and downloads — are available.'
                : status === 'offline'
                ? 'The SmokeByte backend is currently unreachable. Login, uploads, conversions, and downloads will be unavailable until the server comes back online.'
                : 'Checking server availability…'}
            </p>
            <div className="status-popover__notice">
              <span className="notice-icon">⚠️</span>
              <span>
                <strong>Demo Environment</strong> — SmokeByte runs on a self-hosted backend server.
                Availability depends on server uptime.
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ServerStatusBadge;