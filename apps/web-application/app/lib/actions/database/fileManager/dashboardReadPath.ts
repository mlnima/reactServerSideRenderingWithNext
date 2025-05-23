'use server';
import fs from 'fs/promises';
import { errorResponse, successResponse } from '@lib/actions/response';
import path from 'path';

interface IArg {
  targetPath: string;
}

const dashboardReadPath = async ({ targetPath }: IArg) => {
  try {
    const absolutePath = path.join(process.cwd(), '..', 'api-server', targetPath);

    // Check if it's a directory
    const stat = await fs.stat(absolutePath);

    if (stat.isDirectory()) {
      const data = await fs.readdir(absolutePath);
      return successResponse({
        data: {
          data,
          type: 'dir',
        },
      });
    } else {
      const fileData = await fs.readFile(absolutePath, 'utf8');
      return successResponse({
        data: {
          data: fileData,
          type: 'file',
        },
      });
    }
  } catch (error: any) {
    return errorResponse({
      message: 'Something Went Wrong',
      error,
    });
  }
};

export default dashboardReadPath;
