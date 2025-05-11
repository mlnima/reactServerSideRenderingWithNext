import { NextRequest, NextResponse } from 'next/server';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import {getCurrentDatePath} from '@repo/utils';


export async function POST(req: NextRequest) {
  // const formData = await req.formData();
  // const file = formData.get('file') as File;
  //
  // if (!file) {
  //   return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  // }
  //
  // const datePath = getCurrentDatePath('ym');
  // const relativeUploadPath = `/public/uploads/images/${datePath}`;
  // const publicUploadPath = path.join(process.cwd(), 'public', 'uploads', 'images', datePath);
  //
  // await mkdir(publicUploadPath, { recursive: true });
  //
  // const arrayBuffer = await file.arrayBuffer();
  // const buffer = Buffer.from(arrayBuffer);
  //
  // const fileFullPath = path.join(publicUploadPath, file.name);
  // await writeFile(fileFullPath, buffer);
  //
  // const fileUrl = `${relativeUploadPath}/${file.name}`;
  // return NextResponse.json({ filePath: fileUrl });
}