import { supportedFormats } from '../lib/formats';

const MIME_LABELS = {
  'image/jpeg': 'JPEG', 'image/png': 'PNG', 'image/webp': 'WebP',
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
  'audio/mpeg': 'MP3', 'audio/wav': 'WAV', 'audio/aac': 'AAC',
  'audio/flac': 'FLAC', 'audio/ogg': 'OGG', 'audio/mp4': 'M4A',
  'audio/x-m4a': 'M4A', 'audio/x-ms-wma': 'WMA',
  'video/mp4': 'MP4', 'video/x-msvideo': 'AVI', 'video/quicktime': 'MOV',
  'video/webm': 'WebM', 'video/x-matroska': 'MKV',
  'video/x-ms-wmv': 'WMV', 'video/x-flv': 'FLV', 'video/mpeg': 'MPEG',
};

const CATEGORY_ICONS = {
  Image: '🖼️', Document: '📄', Spreadsheet: '📊',
  Presentation: '📽️', Audio: '🎵', Video: '🎬',
};

const SupportedFormatsPage = () => {
  const categories = {};

  Object.entries(supportedFormats).forEach(([mime, data]) => {
    const label = MIME_LABELS[mime] || mime.split('/')[1].toUpperCase();
    if (!categories[data.type]) categories[data.type] = new Set();
    categories[data.type].add(label);
  });

  return (
    <div className="formats-page-wrapper">
      <div className="formats-page-hero">
        <div className="section-label">Supported Formats</div>
        <h1>Everything We Can Convert</h1>
        <p>Upload any of the formats below and convert to any compatible output.</p>
      </div>

      <div className="categories-grid">
        {Object.entries(categories).map(([category, formats]) => (
          <div key={category} className="category-card">
            <div className="category-header">
              <span className="category-icon">{CATEGORY_ICONS[category] || '📁'}</span>
              <h2>{category}s</h2>
            </div>
            <div className="category-body">
              {Array.from(formats).sort().map(format => (
                <span key={format} className="format-tag">{format}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedFormatsPage;