import { createReadStream } from 'fs';
import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/authSession';
import { CONTENT_FILES, PRIVATE_STORAGE_DIR } from '@/lib/contentConfig';

export const runtime = 'nodejs';

function parseRangeHeader(rangeHeader, totalSize) {
  if (!rangeHeader || !rangeHeader.startsWith('bytes=')) {
    return null;
  }

  const [startRaw, endRaw] = rangeHeader.replace('bytes=', '').split('-');
  const start = Number.parseInt(startRaw, 10);
  const end = endRaw ? Number.parseInt(endRaw, 10) : totalSize - 1;

  if (Number.isNaN(start) || Number.isNaN(end) || start > end || start < 0 || end >= totalSize) {
    return null;
  }

  return { start, end };
}

export async function GET(req) {
  const token = req.cookies.get('tdah_session')?.value;
  const session = await verifySessionToken(token);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const filePath = path.join(PRIVATE_STORAGE_DIR, CONTENT_FILES.audiobook.fileName);

  try {
    const stat = await fs.stat(filePath);
    const totalSize = stat.size;
    const rangeHeader = req.headers.get('range');
    const range = parseRangeHeader(rangeHeader, totalSize);

    if (rangeHeader && !range) {
      return new NextResponse(null, {
        status: 416,
        headers: {
          'Content-Range': `bytes */${totalSize}`,
          'Accept-Ranges': 'bytes',
        },
      });
    }

    if (!rangeHeader) {
      const stream = createReadStream(filePath);
      return new NextResponse(stream, {
        status: 200,
        headers: {
          'Content-Type': CONTENT_FILES.audiobook.mimeType,
          'Content-Length': String(totalSize),
          'Accept-Ranges': 'bytes',
          'Cache-Control': 'private, no-store',
        },
      });
    }

    const chunkSize = range.end - range.start + 1;
    const stream = createReadStream(filePath, { start: range.start, end: range.end });

    return new NextResponse(stream, {
      status: 206,
      headers: {
        'Content-Type': CONTENT_FILES.audiobook.mimeType,
        'Content-Length': String(chunkSize),
        'Content-Range': `bytes ${range.start}-${range.end}/${totalSize}`,
        'Accept-Ranges': 'bytes',
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'Audiobook não encontrado' }, { status: 404 });
  }
}
