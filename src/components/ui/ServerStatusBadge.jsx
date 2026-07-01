import { useState, useEffect, useRef } from 'react';
import { useServerStatus } from '../../hooks/userServerStatus';
import './ServerStatusBadge.css';

const CONFIG = {
  checking: { dot: 'dot--pulse',   label: 'Checking…',        color: 'badge--checking' },
  online:   { dot: 'dot--online',  label: 'Server Online ↗',  color: 'badge--online'   },
  offline:  { dot: 'dot--offline', label: 'Server Offline — Why?', color: 'badge--offline' },
};

const ServerStatusBadge = () => {
  const status = useServerStatus();
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const { dot, label, color } = CONFIG[status];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  return (
    <div className="status-badge-wrapper" ref={wrapperRef}>
      <button
        className={`status-badge ${color}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Server status info"
      >
        <span className={`status-dot ${dot}`} />
        {label}
      </button>

      {open && (
        <div className="status-popover">
          <div className="status-popover__header">
            <span className={`status-dot ${dot}`} />
            <strong>
              {status === 'online'  ? 'Server Online'
             : status === 'offline' ? 'Server Offline'
             :                        'Checking…'}
            </strong>
          </div>

          <p className="status-popover__body">
            {status === 'online'
              ? 'Backend is up and reachable. Login, uploads, conversions, and downloads are all working.'
              : status === 'offline'
              ? 'Backend is currently unreachable. Login, uploads, conversions, and downloads are unavailable right now.'
              : 'Checking server availability…'}
          </p>

          <div className="status-popover__notice">
            <span className="notice-icon">⚠️</span>
            <span>
              <strong>Heads up!</strong>{' '}
              Conversions may take a moment — backend is hosted on Render's free tier,
              so the first request might be slow due to cold starts. Hang tight!
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerStatusBadge;