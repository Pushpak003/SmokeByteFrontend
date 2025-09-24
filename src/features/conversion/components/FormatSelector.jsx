
import { FiChevronDown } from 'react-icons/fi';

const FormatSelector = ({ availableFormats, targetFormat, setTargetFormat }) => {
  if (availableFormats.length === 0) {
    return <p className="error-message">Unsupported file type for conversion.</p>;
  }

  return (
    <div className="format-selector">
      <label htmlFor="format">Convert to:</label>
      {/* Humne select ko ek wrapper mein daal diya hai icon ke liye */}
      <div className="select-wrapper">
        <select
          id="format"
          value={targetFormat}
          onChange={(e) => setTargetFormat(e.target.value)}
        >
          {availableFormats.map(format => (
            <option key={format} value={format}>{format}</option>
          ))}
        </select>
        {/* Yahan naya icon add kiya hai */}
        <FiChevronDown className="select-icon" />
      </div>
    </div>
  );
};

export default FormatSelector;