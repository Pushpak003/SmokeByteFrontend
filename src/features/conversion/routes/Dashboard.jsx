import { useLocation } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import JobStatus from '../components/JobStatus';
import FormatGrid from '../components/FormatGrid';
import { useActiveJobContext } from '../../../context/ActiveJobContext';

const DashboardPage = () => {
  const { jobId, setJobId, clearJob } = useActiveJobContext();
  const location       = useLocation();
  const conversionHint = location.state || null;

  return (
    <div className="dashboard-page">
      <div className="dashboard-container">
        {!jobId ? (
          <FileUploader onUploadSuccess={setJobId} conversionHint={conversionHint} />
        ) : (
          <JobStatus jobId={jobId} onReset={clearJob} />
        )}
      </div>
      <FormatGrid />
    </div>
  );
};

export default DashboardPage;