// src/features/conversion/components/FileTypeIcon.jsx

import {
  // We'll use specific icons from Font Awesome (fa)
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaFilePowerpoint,
  FaFileAudio,
  FaFileVideo,
  FaFileImage,
  FaFileCsv,
  FaFileAlt // Default text file icon
} from "react-icons/fa";
import './FileTypeIcon.css';

const getFormatStyle = (format) => {
  const f = format.toLowerCase();
  switch (f) {
    // Documents
    case 'pdf': return { color: '#E53E3E', icon: <FaFilePdf /> }; // Red
    case 'docx': case 'doc': return { color: '#2B579A', icon: <FaFileWord /> }; // Blue
    
    // Spreadsheets
    case 'xlsx': case 'xls': return { color: '#1D6F42', icon: <FaFileExcel /> }; // Green
    case 'csv': return { color: '#207245', icon: <FaFileCsv /> }; // Darker Green

    // Presentations
    case 'pptx': case 'ppt': return { color: '#D24726', icon: <FaFilePowerpoint /> }; // Orange

    // Media
    case 'mp3': case 'wav': case 'aac': return { color: '#EC4899', icon: <FaFileAudio /> }; // Pink
    case 'mp4': case 'mov': case 'avi': return { color: '#8B5CF6', icon: <FaFileVideo /> }; // Violet
    
    // Images
    case 'jpg': case 'jpeg': case 'png': case 'webp': return { color: '#F59E0B', icon: <FaFileImage /> }; // Amber
    
    // Default
    default: return { color: '#6B7280', icon: <FaFileAlt /> }; // Grey
  }
};

const FileTypeIcon = ({ format }) => {
  const { color, icon } = getFormatStyle(format);

  return (
    <div className="file-type-icon-container">
      <div className="file-type-icon-folder" style={{ '--folder-color': color }}>
        <span className="file-type-icon-inner">
          {icon}
        </span>
      </div>
      <span className="file-type-format-tag" style={{ backgroundColor: color }}>
        .{format.toLowerCase()}
      </span>
    </div>
  );
};

export default FileTypeIcon;