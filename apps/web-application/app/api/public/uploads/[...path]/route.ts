import { NextRequest, NextResponse } from 'next/server';
import { join } from 'path';
import fs from 'fs/promises';
// @ts-expect-error: it's fine
import mime from 'mime-types';

export async function GET(
  req: NextRequest,
  context: { params: { path: string[] } }
) {
  const { params } = context;

  const filePath = join(process.cwd(), 'public', 'uploads', ...params.path);

  try {
    const fileBuffer = await fs.readFile(filePath);
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';

    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': mimeType,
        'Cache-Control': 'public, max-age=31536000',
      },
    });
  } catch {
    return new NextResponse('Not found', { status: 404 });
  }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { join } from 'path';
// import fs from 'fs/promises';
// // @ts-expect-error: it's fine
// import mime from 'mime-types';
//
// export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
//
//   const filePath = join(process.cwd(), 'public', 'uploads', ...params.path);
//
//   try {
//     const fileBuffer = await fs.readFile(filePath);
//     const mimeType = mime.lookup(filePath) || 'application/octet-stream';
//
//     return new NextResponse(fileBuffer, {
//       headers: {
//         'Content-Type': mimeType,
//         'Cache-Control': 'public, max-age=31536000',
//       },
//     });
//   } catch {
//     return new NextResponse('Not found', { status: 404 });
//   }
// }


// import { NextRequest, NextResponse } from 'next/server';
// import { join } from 'path';
// import fs from 'fs/promises';
//
// export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
//   const filePath = join(process.cwd(),'public', 'uploads', ...params.path);
//   try {
//     const fileBuffer = await fs.readFile(filePath);
//     const ext = filePath.split('.').pop() || 'webp';
//     return new NextResponse(fileBuffer, {
//       headers: {
//         'Content-Type': `image/${ext}`,
//         'Cache-Control': 'public, max-age=31536000',
//       },
//     });
//   } catch {
//     return new NextResponse('Not found', { status: 404 });
//   }
// }
