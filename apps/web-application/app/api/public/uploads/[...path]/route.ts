import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import fs from 'fs/promises';
import mime from 'mime-types';

export async function GET(req: NextRequest, context: { params: { path: string[] } }) {
  const { path } = await context.params;
  // const { params } = context;
  console.log('\x1b[33m%s\x1b[0m', 'path => ', path);

  const filePath = join(process.cwd(), 'public', 'uploads', ...path);

  return null;
  // try {
  //   const fileBuffer = await fs.readFile(filePath);
  //   const mimeType = mime.lookup(filePath) || 'application/octet-stream';
  //
  //   return new NextResponse(fileBuffer, {
  //     headers: {
  //       'Content-Type': mimeType,
  //       'Cache-Control': 'public, max-age=31536000',
  //     },
  //   });
  // } catch {
  //   return new NextResponse('Not found', { status: 404 });
  // }
}
