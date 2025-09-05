// src/features/conversion/components/JobStatus.jsx

import { useState, useEffect } from 'react';
import api from '../../../lib/api';
import Spinner from '../../../components/ui/Spinner.jsx';
import { FiCheckCircle, FiXCircle, FiDownload, FiRefreshCw, FiLoader } from 'react-icons/fi';

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
          setDownloadUrl(response.data.fileUrl || response.data.url); // Use fileUrl or url
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

   const handleDownload = async () => {
    setIsDownloading(true);
    setError('');
    try {
      // 1. Fetch the file from the Supabase URL
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // 2. Get the file data as a blob (binary data)
      const blob = await response.blob();
      
      // 3. Create a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // 4. Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      const fileName = downloadUrl.split('/').pop(); // Get filename from URL
      link.setAttribute('download', fileName); // Set the filename
      
      // 5. Programmatically click the link
      document.body.appendChild(link);
      link.click();
      
      // 6. Clean up by removing the link and revoking the temporary URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      // 7. Reset the view
      onReset();

    } catch (err) {
      console.error('Download failed:', err);
      setError('Could not download the file.');
    } finally {
      setIsDownloading(false);
    }
  };
  return (
    <div className="job-status-card">
      {status === 'processing' && (
        // THIS IS THE MISSING PART
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
          <button onClick={handleDownload} className="download-button" disabled={isDownloading}>
            {isDownloading ? (
              <>
                <Spinner size="sm" /> Downloading...
              </>
            ) : (
              <>
                <FiDownload /> Download File
              </>
            )}
          </button>
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