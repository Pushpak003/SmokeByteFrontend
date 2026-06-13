import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import Spinner from '../../../components/ui/Spinner.jsx';
import { FiCheckCircle, FiXCircle, FiDownload, FiRefreshCw, FiPlusCircle } from 'react-icons/fi';

const JobStatus = ({ jobId, onReset }) => {
  const [status, setStatus] = useState('processing');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (!jobId) return;
    const intervalId = setInterval(async () => {
      try {
        const response = await api.get(`/status/${jobId}`);
        const currentStatus = response.data.status;
        if (currentStatus === 'completed') {
          setStatus('completed');
          setDownloadUrl(response.data.fileUrl || response.data.url);
          clearInterval(intervalId);
        } else if (currentStatus === 'failed') {
          setStatus('failed');
          setError(response.data.reason || 'File conversion failed on the server.');
          clearInterval(intervalId);
        }
      } catch {
        setStatus('failed');
        setError('Could not get job status.');
        clearInterval(intervalId);
      }
    }, 3000);
    return () => clearInterval(intervalId);
  }, [jobId]);

  const handleDownload = async () => {
    setIsDownloading(true);
    setError('');
    try {
      const response = await fetch(downloadUrl);
      if (!response.ok) throw new Error('Network response was not ok');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadUrl.split('/').pop());
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Could not download the file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="job-status-card">
      {status === 'processing' && (
        <>
          <Spinner />
          <h3>Processing your file…</h3>
          <p>This may take a moment. Hang tight!</p>
        </>
      )}

      {status === 'completed' && (
        <>
          <FiCheckCircle size={52} className="status-icon success" />
          <h3>Conversion Successful!</h3>
          <p>Your file is ready. Download it or convert another one.</p>

          <button onClick={handleDownload} className="download-button" disabled={isDownloading}>
            {isDownloading ? <><Spinner size="sm" /> Downloading…</> : <><FiDownload /> Download File</>}
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