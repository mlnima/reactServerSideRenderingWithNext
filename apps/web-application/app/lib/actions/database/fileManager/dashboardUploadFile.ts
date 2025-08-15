'use server';

import { errorResponse, successResponse } from '@lib/actions/response';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';

import mime from 'mime-types';
import { getCurrentDatePath } from '@repo/utils/dist/src';

const dashboardUploadFile = async ({ file }: { file: FormData }) => {
  try {
    const formFile = file.get('file');
    if (!formFile || !(formFile instanceof File)) {
      return errorResponse({ message: 'Invalid file' });
    }

    const fileName = formFile.name;
    const ext = path.extname(fileName).toLowerCase().replace('.', ''); // e.g. 'exe'

    // Fallback to extension if MIME is missing or unhelpful
    let fileMime = formFile.type || mime.lookup(ext) || '';
    const [group, subtype] = fileMime.split('/');

    const compressedExts = ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'];
    const appExts = ['exe', 'deb', 'dmg', 'appimage', 'msi', 'pkg'];

    let category: string;

    if (compressedExts.includes(ext)) {
      category = 'compressed';
    } else if (['audio'].includes(group)) {
      category = 'audio';
    } else if (['video'].includes(group)) {
      category = 'video';
    } else if (['image'].includes(group)) {
      category = 'images';
    } else if (appExts.includes(ext)) {
      category = 'applications';
    } else if (group === 'application' || group === 'text') {
      category = 'documents';
    } else {
      category = 'documents';
    }

    const datePath = getCurrentDatePath('ym');
    const relativeUploadPath = `/public/uploads/${category}/${datePath}`;
    const absoluteUploadPath = path.join(process.cwd(), '..', 'api-server', 'public', 'uploads', category, datePath);

    await mkdir(absoluteUploadPath, { recursive: true });

    const arrayBuffer = await formFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fileFullPath = path.join(absoluteUploadPath, fileName);
    await writeFile(fileFullPath, buffer);

    const fileUrl = `${relativeUploadPath}/${fileName}`;
    const mimeType = mime.lookup(fileUrl);

    return successResponse({
      data: {
        filePath: fileUrl,
        mimeType,
        category,
      },
    });
  } catch (error: any) {
    console.error('dashboardUploadFile error:', error);
    return errorResponse({
      message: 'Something went wrong during upload',
      error,
    });
  }
};

export default dashboardUploadFile;
