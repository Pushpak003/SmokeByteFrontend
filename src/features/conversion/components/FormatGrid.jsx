import { Link } from 'react-router-dom';
import { supportedFormats } from '../../../lib/formats';
import { FiArrowRight } from 'react-icons/fi';
import './FormatGrid.css';

const MIME_LABELS = {
  'image/jpeg': 'JPG', 'image/png': 'PNG', 'image/webp': 'WebP',
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'application/vnd.ms-powerpoint': 'PPT', 'application/mspowerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'application/vnd.oasis.opendocument.text': 'ODT',
  'application/vnd.oasis.opendocument.spreadsheet': 'ODS',
  'application/vnd.oasis.opendocument.presentation': 'ODP',
  'application/rtf': 'RTF', 'text/plain': 'TXT', 'text/html': 'HTML',
  'text/csv': 'CSV', 'text/markdown': 'MD', 'text/x-markdown': 'MD',
  'audio/mpeg': 'MP3', 'audio/wav': 'WAV', 'audio/aac': 'AAC',
  'audio/flac': 'FLAC', 'audio/ogg': 'OGG', 'audio/x-m4a': 'M4A',
  'audio/x-ms-wma': 'WMA', 'video/mp4': 'MP4', 'video/x-msvideo': 'AVI',
  'video/quicktime': 'MOV', 'video/webm': 'WebM', 'video/x-matroska': 'MKV',
  'video/x-ms-wmv': 'WMV', 'video/x-flv': 'FLV', 'video/mpeg': 'MPEG',
};

const FORMAT_COLORS = {
  pdf: '#e53e3e', docx: '#2b6cb0', doc: '#2b6cb0', xlsx: '#276749',
  xls: '#276749', csv: '#276749', pptx: '#c05621', ppt: '#c05621',
  mp4: '#6b46c1', mov: '#6b46c1', avi: '#6b46c1', webm: '#6b46c1',
  mkv: '#6b46c1', mp3: '#d69e2e', wav: '#d69e2e', aac: '#d69e2e',
  png: '#2b6cb0', jpg: '#d97706', jpeg: '#d97706', webp: '#319795',
  txt: '#718096', odt: '#2b6cb0', html: '#e53e3e', md: '#4a5568',
};

const getColor = (fmt) => FORMAT_COLORS[fmt?.toLowerCase()] || '#6d28d9';

const FormatGrid = () => {
  // Deduplicate: e.g. DOC→PDF appears once even if multiple MIME types map to DOC
  const seen = new Set();
  const conversions = Object.entries(supportedFormats).flatMap(([mime, data]) => {
    const fromLabel = MIME_LABELS[mime] || mime.split('/')[1].toUpperCase();
    return data.formats.map(to => {
      const key = `${fromLabel}-${to}`;
      if (seen.has(key)) return null;
      seen.add(key);
      return { from: fromLabel, to, mime };
    }).filter(Boolean);
  }).slice(0, 12);

  return (
    <div className="format-grid-section">
      <div className="format-grid-header">
        <h2>Popular Conversion Tools</h2>
        <p>Click any tool below to start converting</p>
      </div>

      <div className="format-grid">
        {conversions.map(({ from, to, mime }, i) => (
          <Link
            key={i}
            to="/dashboard"
            state={{ fromMime: mime, toFormat: to, fromLabel: from }}
            className="format-card"
            style={{ '--accent': getColor(to) }}
          >
            <div className="format-card__from">
              <span className="format-badge" style={{ '--c': getColor(from) }}>{from}</span>
            </div>
            <div className="format-card__arrow">
              <FiArrowRight size={14} />
            </div>
            <div className="format-card__to">
              <span className="format-badge format-badge--to" style={{ '--c': getColor(to) }}>{to.toUpperCase()}</span>
            </div>
            <span className="format-card__label">{from} to {to.toUpperCase()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FormatGrid;