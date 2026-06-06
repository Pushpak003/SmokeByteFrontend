export const supportedFormats = {
  // Images
  'image/jpeg': { type: 'Image', formats: ['png', 'webp'] },
  'image/png':  { type: 'Image', formats: ['jpeg', 'webp'] },
  'image/webp': { type: 'Image', formats: ['jpeg', 'png'] },

  // Documents
  'application/pdf': { type: 'Document', formats: ['docx', 'txt'] },
  'application/msword': { type: 'Document', formats: ['pdf', 'docx', 'txt'] },
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { type: 'Document', formats: ['pdf', 'txt'] },
  'text/plain':    { type: 'Document', formats: ['pdf', 'docx'] },
  'text/html':     { type: 'Document', formats: ['pdf'] },
  'application/rtf': { type: 'Document', formats: ['pdf', 'txt'] },
  'text/markdown':   { type: 'Document', formats: ['pdf', 'html'] },
  'text/x-markdown': { type: 'Document', formats: ['pdf', 'html'] },

  // Spreadsheets
  'application/vnd.ms-excel': { type: 'Spreadsheet', formats: ['pdf', 'csv', 'xlsx'] },
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { type: 'Spreadsheet', formats: ['pdf', 'csv', 'xls'] },
  'text/csv': { type: 'Spreadsheet', formats: ['xlsx', 'pdf'] },

  // Presentations
  'application/vnd.ms-powerpoint': { type: 'Presentation', formats: ['pdf', 'pptx'] },
  'application/mspowerpoint':      { type: 'Presentation', formats: ['pdf', 'pptx'] },
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { type: 'Presentation', formats: ['pdf', 'ppt'] },

  // OpenDocument
  'application/vnd.oasis.opendocument.text':         { type: 'Document',     formats: ['pdf', 'docx'] },
  'application/vnd.oasis.opendocument.spreadsheet':  { type: 'Spreadsheet',  formats: ['pdf', 'xlsx', 'csv'] },
  'application/vnd.oasis.opendocument.presentation': { type: 'Presentation', formats: ['pdf', 'pptx'] },

  // Audio — only formats the backend actually accepts
  'audio/mpeg':    { type: 'Audio', formats: ['wav', 'mp3'] },
  'audio/wav':     { type: 'Audio', formats: ['mp3'] },
  'audio/aac':     { type: 'Audio', formats: ['mp3', 'wav'] },
  'audio/flac':    { type: 'Audio', formats: ['mp3', 'wav'] },
  'audio/ogg':     { type: 'Audio', formats: ['mp3'] },
  'audio/mp4':     { type: 'Audio', formats: ['mp3'] },
  'audio/x-m4a':   { type: 'Audio', formats: ['mp3'] },
  'audio/x-ms-wma':{ type: 'Audio', formats: ['mp3'] },

  // Videos — only formats the backend actually accepts
  'video/mp4':        { type: 'Video', formats: ['mov', 'avi', 'webm'] },
  'video/x-msvideo':  { type: 'Video', formats: ['mp4', 'mov', 'webm'] },
  'video/quicktime':  { type: 'Video', formats: ['mp4', 'avi', 'webm'] },
  'video/webm':       { type: 'Video', formats: ['mp4'] },
  'video/x-matroska': { type: 'Video', formats: ['mp4'] },
  'video/x-ms-wmv':   { type: 'Video', formats: ['mp4'] },
  'video/x-flv':      { type: 'Video', formats: ['mp4'] },
  'video/mpeg':       { type: 'Video', formats: ['mp4'] },
};