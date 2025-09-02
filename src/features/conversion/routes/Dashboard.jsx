// src/features/conversion/routes/DashboardPage.jsx
import { useState } from "react";
import FileUploader from "../components/FileUploader.jsx";
import JobStatus from "../components/JobStatus.jsx";

const DashboardPage = () => {
  const [jobId, setJobId] = useState(null);
  return (
    <div className="dashboard-container">
      {" "}
      {}
      {!jobId ? (
        <FileUploader onUploadSuccess={setJobId} />
      ) : (
        <JobStatus jobId={jobId} onReset={() => setJobId(null)} />
      )}
    </div>
  );
};
export default DashboardPage;
