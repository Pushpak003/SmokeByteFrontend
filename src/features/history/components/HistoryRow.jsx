import { FiDownload, FiClock, FiAlertCircle } from 'react-icons/fi';
import FileTypeIcon from '../../conversion/components/FileTypeIcon';
import api from '../../../lib/api';

const STATUS_BADGE = {
  completed:  { label: 'Done',       cls: 'status-badge--done'    },
  failed:     { label: 'Failed',     cls: 'status-badge--failed'  },
  pending:    { label: 'Pending',    cls: 'status-badge--pending' },
  processing: { label: 'Processing', cls: 'status-badge--pending' },
};

const HistoryRow = ({ item }) => {
  const { id: fileId, filename, created_at, ConversionLogs } = item;
  const log          = ConversionLogs?.[0] ?? {};
  const status       = log.status || 'unknown';
  const targetFormat = log.target_format || '';
  const badge        = STATUS_BADGE[status] ?? { label: status, cls: '' };
  const formattedDate = new Date(created_at).toLocaleString();

  const handleDownload = async () => {
    try {
      const res  = await api.get(`/download/${fileId}`, { responseType: 'blob' });
      const blob = new Blob([res.data], { type: res.headers['content-type'] });
      const url  = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href  = url;
      const nameBase = filename.split('.').slice(0, -1).join('.');
      link.setAttribute('download', `${nameBase}.${targetFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch { /* silent fail */ }
  };

  return (
    <tr>
      <td className="history-col-preview">
        <FileTypeIcon format={targetFormat} />
      </td>
      <td className="history-col-details">
        <div className="filename" title={filename}>
          {filename.length > 36 ? filename.slice(0, 34) + '…' : filename}
        </div>
        <div className="date">{formattedDate}</div>
        <span className={`history-status-badge ${badge.cls}`}>{badge.label}</span>
      </td>
      <td className="history-col-format">
        {targetFormat && (
          <span className="history-format-tag">.{targetFormat.toUpperCase()}</span>
        )}
      </td>
      <td className="history-col-action">
        {status === 'completed' && (
          <button onClick={handleDownload} className="btn-download-table">
            <FiDownload size={14} /> Download
          </button>
        )}
        {status === 'failed' && (
          <span className="history-failed-icon" title="Conversion failed">
            <FiAlertCircle size={18} />
          </span>
        )}
        {(status === 'pending' || status === 'processing') && (
          <span className="history-pending-icon" title={badge.label}>
            <FiClock size={18} />
          </span>
        )}
      </td>
    </tr>
  );
};

export default HistoryRow;