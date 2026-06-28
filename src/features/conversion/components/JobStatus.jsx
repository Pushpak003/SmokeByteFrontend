import { useState } from 'react';
import api from '../../../lib/api';
import Spinner from '../../../components/ui/Spinner.jsx';
import {
  FiCheckCircle, FiXCircle, FiDownload,
  FiRefreshCw, FiPlusCircle, FiClock
} from 'react-icons/fi';
import useConversionPoller from '../../../hooks/useConversionPoller';

// JobStatus only handles UI display on the dashboard.
// The actual completion logic (toast + browser notif) is handled by
// GlobalPoller in App.jsx — so it works even when user is on other pages.
const JobStatus = ({ jobId, onReset }) => {
  const [status,        setStatus]        = useState('pending');
  const [fileId,        setFileId]        = useState(null);
  const [filename,      setFilename]      = useState('');
  const [targetFormat,  setTargetFormat]  = useState('');
  const [error,         setError]         = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  // Only tracks UI state — no toast/notif here (GlobalPoller handles that)
  useConversionPoller({
    jobId,
    onTick: (s) => setStatus(s),
    onDone: (data) => {
      setStatus(data.status);
      if (data.status === 'completed') {
        setFileId(data.fileId);
        setFilename(data.filename || '');
        setTargetFormat(data.targetFormat || '');
      } else {
        setError(data.error || 'Conversion failed.');
      }
    },
  });

  const handleDownload = async () => {
    if (!fileId) return;
    setIsDownloading(true);
    setError('');
    try {
      const res  = await api.get(`/download/${fileId}`, { responseType: 'blob' });
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url  = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href  = url;
      const name = filename
        ? `${filename.split('.').slice(0, -1).join('.')}.${targetFormat}`
        : `converted.${targetFormat}`;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="job-status-card">
      {status === 'pending' && (
        <>
          <FiClock size={52} className="status-icon pending" />
          <h3>Queued</h3>
          <p>Your file is waiting in the queue.</p>
          <p className="status-leave-note">You can leave this page — we'll notify you when done.</p>
        </>
      )}
      {status === 'processing' && (
        <>
          <Spinner />
          <h3>Converting…</h3>
          <p>Your file is being converted right now.</p>
          <p className="status-leave-note">You can leave this page — we'll notify you when done.</p>
        </>
      )}
      {status === 'completed' && (
        <>
          <FiCheckCircle size={52} className="status-icon success" />
          <h3>Conversion Successful!</h3>
          <p>Your file is ready to download.</p>
          <button onClick={handleDownload} className="download-button" disabled={isDownloading}>
            {isDownloading
              ? <><Spinner size="sm" /> Downloading…</>
              : <><FiDownload /> Download File</>}
          </button>
          <button onClick={onReset} className="convert-another-button">
            <FiPlusCircle size={15} /> Convert Another File
          </button>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
      {status === 'failed' && (
        <>
          <FiXCircle size={52} className="status-icon error" />
          <h3>Conversion Failed</h3>
          <p className="error-message">{error}</p>
          <button onClick={onReset} className="reset-button">
            <FiRefreshCw size={14} /> Try Another File
          </button>
        </>
      )}
    </div>
  );
};

export default JobStatus;