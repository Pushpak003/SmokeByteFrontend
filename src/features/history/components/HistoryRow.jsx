import { useState } from 'react';
import { FiDownload, FiClock, FiAlertCircle, FiExternalLink } from 'react-icons/fi';
import FileTypeIcon from '../../conversion/components/FileTypeIcon';
import PreviewModal from './PreviewModal';
import api from '../../../lib/api';
import './history-additions.css';

const STATUS_BADGE = {
  completed:  { label: 'Done',       cls: 'status-badge--done'    },
  failed:     { label: 'Failed',     cls: 'status-badge--failed'  },
  pending:    { label: 'Pending',    cls: 'status-badge--pending' },
  processing: { label: 'Processing', cls: 'status-badge--pending' },
};

const getPreviewType = (format) => {
  const f = format?.toLowerCase();
  if (['jpg','jpeg','png','webp','gif','bmp','svg'].includes(f)) return 'image';
  if (['mp4','mov','avi','mkv','webm'].includes(f)) return 'video';
  if (['mp3','wav','aac','ogg','flac'].includes(f)) return 'audio';
  if (['pdf'].includes(f)) return 'pdf';
  return null;
};

const HistoryRow = ({ item }) => {
  const { id: fileId, filename, created_at, ConversionLogs } = item;
  const log           = ConversionLogs?.[0] ?? {};
  const status        = log.status || 'unknown';
  const targetFormat  = log.target_format || '';
  const fileUrl       = log.converted_file_url || null;
  const badge         = STATUS_BADGE[status] ?? { label: status, cls: '' };
  const formattedDate = new Date(created_at).toLocaleString();
  const previewType   = getPreviewType(targetFormat);

  const [showModal, setShowModal] = useState(false);

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

  // Clickable thumbnail / icon for previewable types
  const handleThumbClick = () => {
    if (!fileUrl || !previewType) return;
    if (previewType === 'pdf') window.open(fileUrl, '_blank');
    else setShowModal(true);
  };

  const isClickable = status === 'completed' && previewType && fileUrl;

  return (
    <>
      <tr className="history-row">

        {/* File icon — clickable if previewable */}
        <td className="history-col-icon">
          <div
            className={isClickable ? 'history-icon-wrap history-icon-wrap--clickable' : 'history-icon-wrap'}
            onClick={isClickable ? handleThumbClick : undefined}
            title={isClickable ? (previewType === 'pdf' ? 'Open PDF' : 'Click to preview') : undefined}
          >
            <FileTypeIcon format={targetFormat || filename.split('.').pop()} />
          </div>
        </td>

        {/* File details */}
        <td className="history-col-details">
          <div className="filename" title={filename}>
            {filename.length > 40 ? filename.slice(0, 38) + '…' : filename}
          </div>
          <div className="date">{formattedDate}</div>
          <span className={`history-status-badge ${badge.cls}`}>{badge.label}</span>
        </td>

        {/* Inline thumbnail — images only, clickable */}
        <td className="history-col-thumb">
          {status === 'completed' && previewType === 'image' && fileUrl && (
            <img
              src={fileUrl}
              alt={filename}
              className="history-thumb"
              onClick={() => setShowModal(true)}
              title="Click to preview"
            />
          )}
          {/* Audio/video: show a play hint instead of blank */}
          {status === 'completed' && (previewType === 'video' || previewType === 'audio') && (
            <button className="history-media-play" onClick={() => setShowModal(true)} title="Click to play">
              {previewType === 'video' ? '🎬' : '🎵'}
            </button>
          )}
          {/* PDF: open icon */}
          {status === 'completed' && previewType === 'pdf' && fileUrl && (
            <button className="history-media-play" onClick={() => window.open(fileUrl, '_blank')} title="Open PDF">
              📄
            </button>
          )}
        </td>

        {/* Action — just Download, no separate Preview button */}
        <td className="history-col-action">
          {status === 'completed' && (
            <button onClick={handleDownload} className="btn-download-table">
              <FiDownload size={13} /> Download
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

      {showModal && fileUrl && (
        <PreviewModal
          url={fileUrl}
          filename={filename}
          type={previewType}
          targetFormat={targetFormat}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default HistoryRow;