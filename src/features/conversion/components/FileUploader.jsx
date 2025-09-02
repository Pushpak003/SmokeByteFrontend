import { useState, useCallback, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../../lib/api';
import { FiUploadCloud, FiFileText, FiX, FiChevronsRight, FiImage, FiVideo, FiMusic } from 'react-icons/fi';
import { supportedFormats } from '../../../lib/formats';
import FormatSelector from './FormatSelector';

// Helper to get an icon based on file type
const getFileIcon = (type = '') => {
  if (type.startsWith('image/')) return <FiImage size={40} className="file-type-icon" />;
  if (type.startsWith('video/')) return <FiVideo size={40} className="file-type-icon" />;
  if (type.startsWith('audio/')) return <FiMusic size={40} className="file-type-icon" />;
  return <FiFileText size={40} className="file-type-icon" />;
};

const FileUploader = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('');
  const [availableFormats, setAvailableFormats] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0); // NEW: State for progress bar

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const currentFile = acceptedFiles[0];
      const formatInfo = supportedFormats[currentFile.type];
      setFile(currentFile);
      if (formatInfo) {
        setAvailableFormats(formatInfo.formats);
        setTargetFormat(formatInfo.formats[0]);
        setError('');
      } else {
        setAvailableFormats([]);
        setTargetFormat('');
        setError('This file type is not supported.');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });

  const fileIcon = useMemo(() => getFileIcon(file?.type), [file]);

  const removeFile = () => {
    setFile(null);
    setAvailableFormats([]);
    setTargetFormat('');
    setError('');
    setUploadProgress(0); // NEW: Reset progress on remove
  };

  const handleSubmit = async () => {
    if (!file || !targetFormat) {
      setError('Please select a file and a target format.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0); // NEW: Reset progress on new upload
    setError('');
    
    let endpoint = '';
    const formatInfo = supportedFormats[file.type];
    const fileCategory = formatInfo ? formatInfo.type : '';

    if (fileCategory === 'Image') {
      endpoint = '/convert/image';
    } else if (fileCategory === 'Document' || fileCategory === 'Presentation' || fileCategory === 'Spreadsheet') {
      endpoint = '/convert/document';
    } else if (fileCategory === 'Video' || fileCategory === 'Audio') {
      endpoint = '/convert/media';
    } else {
      setError('Cannot determine the correct conversion route.');
      setIsUploading(false);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetFormat', targetFormat);
    
    // NEW: Axios config for progress tracking
    const config = {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percentCompleted);
      },
    };

    try {
      const response = await api.post(endpoint, formData, config);
      onUploadSuccess(response.data.jobId);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('File upload failed. Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="uploader-card">
      {!file ? (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <FiUploadCloud size={60} className="upload-icon" />
          <h2>Drag & Drop File</h2>
          <p>or click to browse</p>
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-details">
            <span className="file-icon">{fileIcon}</span>
            <div className="file-info">
              <strong>{file.name}</strong>
              <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <button onClick={removeFile} className="remove-btn" disabled={isUploading}><FiX /></button>
          </div>
          
          {/* NEW: Show progress bar when uploading */}
          {isUploading ? (
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: `${uploadProgress}%` }}></div>
              <span className="progress-text">{uploadProgress}%</span>
            </div>
          ) : (
            <div className="conversion-form">
              <FormatSelector availableFormats={availableFormats} targetFormat={targetFormat} setTargetFormat={setTargetFormat} />
              <button onClick={handleSubmit} disabled={availableFormats.length === 0} className="convert-button">
                Convert File <FiChevronsRight />
              </button>
            </div>
          )}
        </div>
      )}
      {error && <p className="error-message" style={{marginTop: '1rem'}}>{error}</p>}
    </div>
  );
};

export default FileUploader;