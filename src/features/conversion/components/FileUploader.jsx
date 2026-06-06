import { useState, useCallback, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import api from '../../../lib/api';
import { FiUploadCloud, FiFileText, FiX, FiChevronsRight, FiImage, FiVideo, FiMusic, FiInfo } from 'react-icons/fi';
import { supportedFormats } from '../../../lib/formats';
import FormatSelector from './FormatSelector';

const getFileIcon = (type = '') => {
  if (type.startsWith('image/')) return <FiImage size={36} className="file-type-icon" />;
  if (type.startsWith('video/')) return <FiVideo size={36} className="file-type-icon" />;
  if (type.startsWith('audio/')) return <FiMusic size={36} className="file-type-icon" />;
  return <FiFileText size={36} className="file-type-icon" />;
};

const FileUploader = ({ onUploadSuccess, conversionHint }) => {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('');
  const [availableFormats, setAvailableFormats] = useState([]);
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      const f = acceptedFiles[0];
      const formatInfo = supportedFormats[f.type];
      setFile(f);
      if (formatInfo) {
        setAvailableFormats(formatInfo.formats);
        // If user clicked a converter card, pre-select the target format
        const preset = conversionHint?.toFormat;
        setTargetFormat(preset && formatInfo.formats.includes(preset) ? preset : formatInfo.formats[0]);
        setError('');
      } else {
        setAvailableFormats([]);
        setTargetFormat('');
        setError('This file type is not supported.');
      }
    }
  }, [conversionHint]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: false });
  const fileIcon = useMemo(() => getFileIcon(file?.type), [file]);

  const removeFile = () => {
    setFile(null); setAvailableFormats([]); setTargetFormat('');
    setError(''); setUploadProgress(0);
  };

  const handleSubmit = async () => {
    if (!file || !targetFormat) { setError('Please select a file and a target format.'); return; }
    setIsUploading(true); setUploadProgress(0); setError('');

    const formatInfo = supportedFormats[file.type];
    const category = formatInfo?.type || '';
    let endpoint = '';
    if (category === 'Image') endpoint = '/convert/image';
    else if (['Document','Presentation','Spreadsheet'].includes(category)) endpoint = '/convert/document';
    else if (['Video','Audio'].includes(category)) endpoint = '/convert/media';
    else { setError('Cannot determine conversion route.'); setIsUploading(false); return; }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetFormat', targetFormat);

    try {
      const response = await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => setUploadProgress(Math.round((e.loaded * 100) / e.total)),
      });
      onUploadSuccess(response.data.jobId);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="uploader-card">
      {conversionHint && !file && (
        <div className="conversion-hint">
          <FiInfo size={14} />
          Upload a <strong>{conversionHint.fromLabel}</strong> file to convert it to <strong>{conversionHint.toFormat.toUpperCase()}</strong>
        </div>
      )}

      {!file ? (
        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
          <input {...getInputProps()} />
          <div className="dropzone-inner">
            <div className="dropzone-icon"><FiUploadCloud size={52} /></div>
            <h2>Drop your file here</h2>
            <p>or <span className="browse-link">browse to upload</span></p>
            <div className="dropzone-hint">Max file size: 50MB</div>
          </div>
        </div>
      ) : (
        <div className="file-preview-container">
          <div className="file-preview-header">
            <span className="file-icon">{fileIcon}</span>
            <div className="file-info">
              <strong title={file.name}>{file.name.length > 35 ? file.name.slice(0,32)+'...' : file.name}</strong>
              <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <button onClick={removeFile} className="remove-btn" disabled={isUploading}><FiX /></button>
          </div>

          {isUploading ? (
            <div className="upload-progress">
              <div className="progress-bar-container">
                <div className="progress-bar" style={{ width: `${uploadProgress}%` }} />
                <span className="progress-text">{uploadProgress}%</span>
              </div>
              <p className="progress-label">Uploading your file…</p>
            </div>
          ) : (
            <div className="conversion-form">
              <FormatSelector availableFormats={availableFormats} targetFormat={targetFormat} setTargetFormat={setTargetFormat} />
              <button onClick={handleSubmit} disabled={availableFormats.length === 0} className="convert-button">
                Convert <FiChevronsRight />
              </button>
            </div>
          )}
        </div>
      )}
      {error && <p className="error-message" style={{marginTop:'1rem'}}>{error}</p>}
    </div>
  );
};

export default FileUploader;