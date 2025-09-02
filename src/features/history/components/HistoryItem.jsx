// src/features/history/components/HistoryItem.jsx

import { FiDownload } from 'react-icons/fi';

const HistoryItem = ({ item }) => {
  const { originalFilename, status, createdAt, downloadUrl } = item;
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <div className="history-item">
      <div className="history-item-info">
        <p className="filename">{originalFilename}</p>
        <p className="date">{formattedDate}</p>
      </div>
      <div className="history-item-status">
        <span className={`status-badge status-${status}`}>{status}</span>
        {status === 'completed' && (
          <a href={downloadUrl} className="btn-download" target="_blank" rel="noopener noreferrer">
            <FiDownload /> Download
          </a>
        )}
      </div>
    </div>
  );
};

export default HistoryItem;