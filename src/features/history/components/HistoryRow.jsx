import { FiDownload } from 'react-icons/fi';
import FileTypeIcon from '../../conversion/components/FileTypeIcon';
import api from '../../../lib/api';

const HistoryRow = ({ item }) => {
  const { filename, created_at, ConversionLogs } = item;
  
  const log = ConversionLogs && ConversionLogs.length > 0 ? ConversionLogs[0] : {};
  const status = log.status || 'unknown';
  const downloadUrl = log.converted_file_url;
  const targetFormat = log.target_format || '';

  const formattedDate = new Date(created_at).toLocaleString();

  // THIS IS THE UPDATED DOWNLOAD FUNCTION
  const handleDownload = async () => {
    if (!downloadUrl) {
      console.error("No download URL available.");
      return;
    }

    console.log("1. Starting download for:", downloadUrl);
    try {
      const backendProxyUrl = `/download?url=${encodeURIComponent(downloadUrl)}`;
      
      const response = await api.get(backendProxyUrl, {
        responseType: 'blob', // Important: expect a file, not JSON
      });
      console.log("2. Received file data (blob) from backend.");

      // Create a temporary URL from the file data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      
      // Construct the new filename with the correct extension
      const originalNameWithoutExt = filename.split('.').slice(0, -1).join('.');
      const newFileName = `${originalNameWithoutExt}.${targetFormat}`;
      link.setAttribute('download', newFileName);
      console.log("3. Triggering browser download for:", newFileName);
      
      // Add the link to the page, click it, then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the temporary URL
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("4. Download failed in frontend:", error);
    }
  };

  return (
    <tr>
      <td className="file-preview-cell">
        <FileTypeIcon format={targetFormat} />
      </td>
      <td className="file-details-cell">
        <div className="filename">{filename}</div>
        <div className="date">{formattedDate}</div>
      </td>
      <td className="file-action-cell">
        {status === 'completed' && downloadUrl && (
          <button onClick={handleDownload} className="btn-download-table">
            <FiDownload /> Download
          </button>
        )}
      </td>
    </tr>
  );
};

export default HistoryRow;