import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import JobStatus from '../components/JobStatus';
import FormatGrid from '../components/FormatGrid';

const DashboardPage = () => {
  const [jobId, setJobId] = useState(null);
  const location = useLocation();
  // Passed from FormatGrid click: { fromMime, toFormat, fromLabel }
  const conversionHint = location.state || null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {!jobId ? (
          <FileUploader onUploadSuccess={setJobId} conversionHint={conversionHint} />
        ) : (
          <JobStatus jobId={jobId} onReset={() => setJobId(null)} />
        )}
      </div>
      <FormatGrid />
    </div>
  );
};

export default DashboardPage;