// src/features/conversion/components/JobStatus.jsx

import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import Spinner from '../../../components/ui/Spinner.jsx';
import { FiCheckCircle, FiXCircle, FiDownload, FiRefreshCw } from 'react-icons/fi';

const JobStatus = ({ jobId, onReset }) => {
  const [status, setStatus] = useState('processing');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!jobId) return;

    const intervalId = setInterval(async () => {
      try {
        const response = await api.get(`/status/${jobId}`);
        const currentStatus = response.data.status;
        
        if (currentStatus === 'completed') {
          setStatus('completed');
          // THE FIX IS HERE: Use response.data.fileUrl
          setDownloadUrl(response.data.fileUrl);
          clearInterval(intervalId);
        } else if (currentStatus === 'failed') {
          setStatus('failed');
          setError(response.data.reason || 'File conversion failed on the server.');
          clearInterval(intervalId);
        }
      } catch (err) {
        setStatus('failed');
        setError('Could not get job status.');
        clearInterval(intervalId);
      }
    }, 3000);

    return () => clearInterval(intervalId);
  }, [jobId]);

  return (
    <div className="job-status-card">
      {status === 'processing' && (
        <>
          <Spinner />
          <h3>Processing File...</h3>
          <p>Please wait while we convert your file. This may take a moment.</p>
        </>
      )}
      {status === 'completed' && (
        <>
          <FiCheckCircle size={50} className="status-icon success" />
          <h3>Conversion Successful!</h3>
          <p>Your file is ready to be downloaded.</p>
          <a
            href={downloadUrl}
            download // The 'download' attribute tells the browser to download the file
            onClick={onReset}
            className="download-button"
          >
            <FiDownload /> Download File
          </a>
        </>
      )}
      {status === 'failed' && (
        <>
          <FiXCircle size={50} className="status-icon error" />
          <h3>Conversion Failed</h3>
          <p className="error-message">{error}</p>
          <button onClick={onReset} className="reset-button">
            <FiRefreshCw /> Try Another File
          </button>
        </>
      )}
    </div>
  );
};

export default JobStatus;