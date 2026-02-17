import fs from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import { verifySessionToken } from '@/lib/authSession';
import { CONTENT_FILES, PRIVATE_STORAGE_DIR } from '@/lib/contentConfig';

export const runtime = 'nodejs';

export async function GET(req) {
  const session = await verifySessionToken(req);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const filePath = path.join(PRIVATE_STORAGE_DIR, CONTENT_FILES.ebook.fileName);

  try {
    const fileBuffer = await fs.readFile(filePath);

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': CONTENT_FILES.ebook.mimeType,
        'Content-Length': String(fileBuffer.length),
        'Content-Disposition': `inline; filename="${CONTENT_FILES.ebook.downloadName}"`,
        'Cache-Control': 'private, no-store',
      },
    });
  } catch {
    return NextResponse.json({ error: 'E-book não encontrado' }, { status: 404 });
  }
}
