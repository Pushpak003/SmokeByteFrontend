import { useEffect } from 'react';
import { FiX, FiDownload } from 'react-icons/fi';

const PreviewModal = ({ url, filename, type, targetFormat, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, []);

  const nameBase = filename.split('.').slice(0, -1).join('.');
  const downloadName = `${nameBase}.${targetFormat}`;

  return (
    <div className="preview-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="preview-modal">

        {/* Header */}
        <div className="preview-header">
          <span className="preview-filename" title={filename}>
            {filename.length > 45 ? filename.slice(0, 43) + '…' : filename}
          </span>
          <div className="preview-header-actions">
            <a
              href={url}
              download={downloadName}
              className="preview-download-btn"
              title="Download"
            >
              <FiDownload size={16} />
            </a>
            <button className="preview-close-btn" onClick={onClose} title="Close (Esc)">
              <FiX size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="preview-body">
          {type === 'image' && (
            <img src={url} alt={filename} className="preview-image" />
          )}

          {type === 'video' && (
            <video controls autoPlay className="preview-video">
              <source src={url} />
              Your browser does not support this video format.
            </video>
          )}

          {type === 'audio' && (
            <div className="preview-audio-wrapper">
              <div className="preview-audio-icon">🎵</div>
              <p className="preview-audio-name">{filename}</p>
              <audio controls autoPlay className="preview-audio">
                <source src={url} />
                Your browser does not support this audio format.
              </audio>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default PreviewModal;