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

  const handleDownload = async () => {
    if (!downloadUrl) return;

    try {
      const backendProxyUrl = `/download?url=${encodeURIComponent(downloadUrl)}`;
      const response = await api.get(backendProxyUrl, { responseType: 'blob' });

      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const originalNameWithoutExt = filename.split('.').slice(0, -1).join('.');
      link.setAttribute('download', `${originalNameWithoutExt}.${targetFormat}`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      // silently fail — user can retry
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