import { useState } from 'react';
import FileUploader from '../components/FileUploader';
import JobStatus from '../components/JobStatus';
import FormatGrid from '../components/FormatGrid'; // Import the new component

const DashboardPage = () => {
  const [jobId, setJobId] = useState(null);

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {!jobId ? (
          <FileUploader onUploadSuccess={setJobId} />
        ) : (
          <JobStatus jobId={jobId} onReset={() => setJobId(null)} />
        )}
      </div>
      <FormatGrid />
    </div>
  );
};

export default DashboardPage;