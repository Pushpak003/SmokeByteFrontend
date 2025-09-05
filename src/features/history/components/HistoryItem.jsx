import { FiDownload } from 'react-icons/fi';

const HistoryItem = ({ item }) => {
  // Use the property names from your API response
  const { filename, created_at, ConversionLogs } = item;

  // Get status and download URL from the nested ConversionLogs object
  const log = ConversionLogs && ConversionLogs.length > 0 ? ConversionLogs[0] : {};
  const status = log.status || 'unknown';
  const downloadUrl = log.converted_file_url;

  const formattedDate = new Date(created_at).toLocaleString();

  return (
    <div className="history-item">
      <div className="history-item-info">
        <p className="filename">{filename}</p>
        <p className="date">{formattedDate}</p>
      </div>
      <div className="history-item-status">
        <span className={`status-badge status-${status}`}>{status}</span>
        {status === 'completed' && downloadUrl && (
          <a 
            href={downloadUrl} 
            className="btn-download" 
            target="_blank" 
            rel="noopener noreferrer"
            download // This attribute helps force the download
          >
            <FiDownload /> Download
          </a>
        )}
      </div>
    </div>
  );
};

export default HistoryItem