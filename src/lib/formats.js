// src/lib/formats.js

export const supportedFormats = {
  // Images
  'image/jpeg': { type: 'Image', formats: ['PNG', 'WEBP', 'GIF', 'PDF'] },
  'image/png': { type: 'Image', formats: ['JPG', 'WEBP', 'GIF', 'PDF'] },
  'image/webp': { type: 'Image', formats: ['JPG', 'PNG', 'GIF', 'PDF'] },

  // Documents
  'application/pdf': { type: 'Document', formats: ['DOCX', 'TXT', 'JPG'] },
  'application/msword': { type: 'Document', formats: ['PDF', 'DOCX', 'TXT'] }, // .doc
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': { type: 'Document', formats: ['PDF', 'TXT'] }, // .docx
  'text/plain': { type: 'Document', formats: ['PDF', 'DOCX'] },
  'text/html': { type: 'Document', formats: ['PDF'] },
  'application/rtf': { type: 'Document', formats: ['PDF', 'TXT'] },
  'text/markdown': { type: 'Document', formats: ['PDF', 'HTML'] },
  'text/x-markdown': { type: 'Document', formats: ['PDF', 'HTML'] },

  // Spreadsheets
  'application/vnd.ms-excel': { type: 'Spreadsheet', formats: ['PDF', 'CSV', 'XLSX'] }, // .xls
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': { type: 'Spreadsheet', formats: ['PDF', 'CSV', 'XLS'] }, // .xlsx
  'text/csv': { type: 'Spreadsheet', formats: ['XLSX', 'PDF'] },

  // Presentations
  'application/vnd.ms-powerpoint': { type: 'Presentation', formats: ['PDF', 'PPTX'] }, // .ppt
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': { type: 'Presentation', formats: ['PDF', 'PPT'] }, // .pptx

  // OpenDocument Formats
  'application/vnd.oasis.opendocument.text': { type: 'Document', formats: ['PDF', 'DOCX'] }, // .odt
  'application/vnd.oasis.opendocument.spreadsheet': { type: 'Spreadsheet', formats: ['PDF', 'XLSX', 'CSV'] }, // .ods
  'application/vnd.oasis.opendocument.presentation': { type: 'Presentation', formats: ['PDF', 'PPTX'] }, // .odp

  // Audio
  'audio/mpeg': { type: 'Audio', formats: ['WAV', 'AAC', 'FLAC'] }, // .mp3
  'audio/wav': { type: 'Audio', formats: ['MP3', 'AAC', 'FLAC'] },
  'audio/aac': { type: 'Audio', formats: ['MP3', 'WAV'] },
  'audio/flac': { type: 'Audio', formats: ['MP3', 'WAV'] },
  'audio/ogg': { type: 'Audio', formats: ['MP3'] },
  'audio/mp4': { type: 'Audio', formats: ['MP3'] }, // .m4a
  'audio/x-m4a': { type: 'Audio', formats: ['MP3'] },
  'audio/x-ms-wma': { type: 'Audio', formats: ['MP3'] }, // .wma

  // Videos
  'video/mp4': { type: 'Video', formats: ['MOV', 'AVI', 'WEBM', 'GIF'] },
  'video/x-msvideo': { type: 'Video', formats: ['MP4', 'MOV', 'WEBM'] }, // .avi
  'video/quicktime': { type: 'Video', formats: ['MP4', 'AVI', 'WEBM'] }, // .mov
  'video/webm': { type: 'Video', formats: ['MP4'] },
  'video/x-matroska': { type: 'Video', formats: ['MP4'] }, // .mkv
  'video/x-ms-wmv': { type: 'Video', formats: ['MP4'] }, // .wmv
  'video/x-flv': { type: 'Video', formats: ['MP4'] }, // .flv
  'video/mpeg': { type: 'Video', formats: ['MP4'] },
};