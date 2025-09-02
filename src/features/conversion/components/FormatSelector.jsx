// src/features/conversion/components/FormatSelector.jsx

const FormatSelector = ({ availableFormats, targetFormat, setTargetFormat }) => {
  if (availableFormats.length === 0) {
    return <p className="error-message">Unsupported file type for conversion.</p>;
  }

  return (
    <div className="format-selector">
      <label htmlFor="format">Convert to:</label>
      <select
        id="format"
        value={targetFormat}
        onChange={(e) => setTargetFormat(e.target.value)}
      >
        {availableFormats.map(format => (
          <option key={format} value={format}>{format}</option>
        ))}
      </select>
    </div>
  );
};

export default FormatSelector;