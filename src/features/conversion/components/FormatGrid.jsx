import { supportedFormats } from '../../../lib/formats';
import FileTypeIcon from './FileTypeIcon';
import { FiChevronRight } from 'react-icons/fi';
import './FormatGrid.css';

const mimeToLabel = (mimeType) => {
  const map = {
    'application/pdf': 'PDF',
    'application/msword': 'DOC',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
    'application/vnd.ms-excel': 'XLS',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
    'application/vnd.ms-powerpoint': 'PPT',
    'application/mspowerpoint': 'PPT',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
    'application/vnd.oasis.opendocument.text': 'ODT',
    'application/vnd.oasis.opendocument.spreadsheet': 'ODS',
    'application/vnd.oasis.opendocument.presentation': 'ODP',
    'application/rtf': 'RTF',
    'text/plain': 'TXT',
    'text/html': 'HTML',
    'text/csv': 'CSV',
    'text/markdown': 'MD',
    'text/x-markdown': 'MD',
    'audio/mpeg': 'MP3',
    'audio/wav': 'WAV',
    'audio/aac': 'AAC',
    'audio/flac': 'FLAC',
    'audio/ogg': 'OGG',
    'audio/mp4': 'M4A',
    'audio/x-m4a': 'M4A',
    'audio/x-ms-wma': 'WMA',
    'video/mp4': 'MP4',
    'video/x-msvideo': 'AVI',
    'video/quicktime': 'MOV',
    'video/webm': 'WEBM',
    'video/x-matroska': 'MKV',
    'video/x-ms-wmv': 'WMV',
    'video/x-flv': 'FLV',
    'video/mpeg': 'MPEG',
    'image/jpeg': 'JPG',
    'image/png': 'PNG',
    'image/webp': 'WEBP',
  };
  return map[mimeType] || mimeType.split('/')[1].toUpperCase();
};

const FormatGrid = () => {
  const allConversions = Object.entries(supportedFormats).flatMap(([mimeType, data]) => {
    const fromFormat = mimeToLabel(mimeType);
    return data.formats.map(toFormat => ({ from: fromFormat, to: toFormat.toUpperCase() }));
  });

  const displayedConversions = allConversions.slice(0, 12);

  return (
    <div className="format-grid-container">
      <h2>Explore Converter Tools</h2>
      <div className="format-grid">
        {displayedConversions.map((conv, index) => (
          <div key={index} className="format-card">
            <FileTypeIcon format={conv.to} />
            <div className="format-text">{conv.from} to {conv.to}</div>
            <FiChevronRight className="format-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormatGrid;