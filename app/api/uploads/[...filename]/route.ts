import { NextRequest, NextResponse } from 'next/server';
import { existsSync, readFileSync } from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

const uploadCandidates = [
  process.env.ADMIN_UPLOADS_DIR,
  path.resolve(process.cwd(), '..', '..', 'girja_enterprise_admin', 'public', 'uploads'),
  path.resolve(process.cwd(), '..', 'girja_enterprise_admin', 'public', 'uploads'),
  path.join(process.cwd(), 'public', 'uploads'),
].filter(Boolean) as string[];

function getUploadFile(filename: string): { filePath: string; buffer: Buffer } | null {
  for (const dir of uploadCandidates) {
    const filePath = path.join(dir, filename);
    if (existsSync(filePath)) {
      try {
        const buffer = readFileSync(filePath);
        return { filePath, buffer };
      } catch {
        // continue search
      }
    }
  }
  return null;
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.svg':
      return 'image/svg+xml';
    case '.jpeg':
    case '.jpg':
    default:
      return 'image/jpeg';
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string[] } }
) {
  const filename = Array.isArray(params.filename) ? params.filename.join('/') : params.filename;

  if (!filename) {
    return new NextResponse('Not found', { status: 404 });
  }

  const result = getUploadFile(filename);
  if (!result) {
    return new NextResponse('File not found', { status: 404 });
  }

  const contentType = getContentType(result.filePath);

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
