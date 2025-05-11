'use server';
import fs from 'fs/promises';
import { errorResponse, successResponse } from '@lib/actions/response';
import path from 'path';
import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
import { verifySession } from '@lib/dal';

interface IArg {
  targetPath: string;
}

const dashboardDeleteFile = async ({ targetPath }: IArg) => {
  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    await connectToDatabase('dashboardDeleteFile');

    const fileData = await fileSchema.findOne({filePath:targetPath})

    if (fileData){
      if (fileData.usageType === 'postThumbnail'){
        await postSchema.findOneAndUpdate({thumbnail:fileData._id},{$unset:{thumbnail:''}})
      }
     await fileSchema.findByIdAndDelete(fileData._id)
    }

    const absolutePath = path.join(process.cwd(), targetPath);

    try {
      await fs.unlink(absolutePath);
    }catch (error){
      console.log(`error removing the file`,absolutePath)
      console.log(`error`,error)
    }


    return successResponse({
      message: 'Deleted',
    });
  } catch (error: any) {
    return errorResponse({
      message: 'Something Went Wrong',
      error,
    });
  }
};

export default dashboardDeleteFile;