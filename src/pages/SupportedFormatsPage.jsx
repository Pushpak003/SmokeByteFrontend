
import { supportedFormats } from '../lib/formats';


const SupportedFormatsPage = () => {
  const categories = {};
  // Group formats by their type (e.g., 'Image', 'Document')
  Object.entries(supportedFormats).forEach(([mime, data]) => {
    const from = (mime.split('/')[1] || "").toUpperCase().replace(/VND\.OPENXMLFORMATS-OFFICEDOCUMENT\.(WORDPROCESSINGML\.DOCUMENT|PRESENTATIONML\.PRESENTATION|SPREADSHEETML\.SHEET)/, (match, p1) => {
        if (p1 === 'WORDPROCESSINGML.DOCUMENT') return 'DOCX';
        if (p1 === 'PRESENTATIONML.PRESENTATION') return 'PPTX';
        if (p1 === 'SPREADSHEETML.SHEET') return 'XLSX';
        return match;
    });

    if (!categories[data.type]) {
      categories[data.type] = new Set();
    }
    categories[data.type].add(from);
  });

  return (
    <div className="static-page-container formats-page">
      <h1>All Supported Formats</h1>
      <p>We support a vast range of file types across different categories.</p>
      
      <div className="categories-grid">
        {Object.entries(categories).map(([category, formats]) => (
          <div key={category} className="category-card">
            <div className="category-header">
              <h2>{category}s</h2>
            </div>
            <div className="category-body">
              {Array.from(formats).sort().map(format => <span key={format} className="format-tag">{format}</span>)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportedFormatsPage;