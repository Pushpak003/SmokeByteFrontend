import { supportedFormats } from '../../../lib/formats';
import FileTypeIcon from './FileTypeIcon'; // Naya component import karein
import { FiChevronRight } from 'react-icons/fi';
// import './FormatGrid.css'; // Is line ko delete kar dein

const FormatGrid = () => {
  const allConversions = Object.entries(supportedFormats).flatMap(([mimeType, data]) => {
    const fromFormat = (mimeType.split('/')[1] || "").toUpperCase().replace('VND.OPENXMLFORMATS-OFFICEDOCUMENT.WORDPROCESSINGML.DOCUMENT', 'DOCX');
    return data.formats.map(toFormat => ({ from: fromFormat, to: toFormat }));
  });

  const displayedConversions = allConversions.slice(0, 12);

  return (
    <div className="format-grid-container">
      <h2>Explore Converter Tools</h2>
      <div className="format-grid">
        {displayedConversions.map((conv, index) => (
          <div key={index} className="format-card">
            {/* Yahan naya icon component use karein */}
            <FileTypeIcon format={conv.to} />
            <div className="format-text">
              {conv.from} to {conv.to}
            </div>
            <FiChevronRight className="format-arrow" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormatGrid;