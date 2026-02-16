import path from 'path';

export const PRIVATE_STORAGE_DIR = path.join(process.cwd(), 'storage', 'private');

export const CONTENT_FILES = {
  ebook: {
    fileName: 'ebook.pdf',
    mimeType: 'application/pdf',
    downloadName: 'ebook-tdah.pdf',
  },
  audiobook: {
    fileName: 'audiobook.mp3',
    mimeType: 'audio/mpeg',
    downloadName: 'audiobook-tdah.mp3',
  },
};
