import { useLocation } from 'react-router-dom';
import FileUploader from '../components/FileUploader';
import JobStatus from '../components/JobStatus';
import FormatGrid from '../components/FormatGrid';
import { ToastContainer } from '../../../components/ui/Toast';
import { useToast } from '../../../hooks/useToast';
import useActiveJob from '../../../hooks/useActiveJob';

const DashboardPage = () => {
  const { jobId, setJobId, clearJob } = useActiveJob();
  const location       = useLocation();
  const conversionHint = location.state || null;
  const toast          = useToast();

  return (
    <div className="dashboard-page">
      <ToastContainer toasts={toast.toasts} remove={toast.remove} />

      <div className="dashboard-container">
        {!jobId ? (
          <FileUploader onUploadSuccess={setJobId} conversionHint={conversionHint} />
        ) : (
          <JobStatus jobId={jobId} onReset={clearJob} toast={toast} />
        )}
      </div>

      <FormatGrid />
    </div>
  );
};

export default DashboardPage;