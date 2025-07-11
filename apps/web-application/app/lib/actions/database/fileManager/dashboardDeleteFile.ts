'use server';
import fs from 'fs/promises';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import path from 'path';
import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { IFile } from '@repo/typescript-types';

interface IArg {
  targetPath: string;
}

const dashboardDeleteFile = async ({ targetPath }: IArg): Promise<ServerActionResponse> => {


  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    await connectToDatabase('dashboardDeleteFile');


    let fileFound = false;

    const fileData = await fileSchema.findOne({ filePath: targetPath }).lean<IFile>().exec();

    if (fileData) {
      fileFound = true;
      if (fileData.usageType === 'postThumbnail') {
        await postSchema.findOneAndUpdate(
          { thumbnail: fileData._id },
          { $unset: { thumbnail: '' } },
        ).exec();
      }
      await fileSchema.findByIdAndDelete(fileData._id).exec();
    }

    if (fileFound) {
      const absolutePath = path.join(process.cwd(), '..', 'api-server', targetPath);
      try {
        await fs.unlink(absolutePath);
      } catch (error) {
        console.log(`Could not remove the physical file, but DB record is deleted:`, absolutePath);
        console.log(`fs.unlink error:`, error);
      }
    }


    return successResponse({
      message: 'Deleted',
    });

  } catch (error: any) {
    console.error('dashboardDeleteFile Error =>', error);
    return errorResponse({
      message: 'Something Went Wrong',
    });
  }
};

export default dashboardDeleteFile;


// 'use server';
// import fs from 'fs/promises';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import path from 'path';
// import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
// import { verifySession } from '@lib/dal';
//
// interface IArg {
//   targetPath: string;
// }
//
// const dashboardDeleteFile = async ({ targetPath }: IArg) => {
//   try {
//
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({ message: 'Unauthorized Access' });
//     }
//
//     await connectToDatabase('dashboardDeleteFile');
//
//     const fileData = await fileSchema.findOne({filePath:targetPath})
//
//     if (fileData){
//       if (fileData.usageType === 'postThumbnail'){
//         await postSchema.findOneAndUpdate({thumbnail:fileData._id},{$unset:{thumbnail:''}})
//       }
//      await fileSchema.findByIdAndDelete(fileData._id)
//     }
//
//     const absolutePath = path.join(process.cwd(), '..', 'api-server', targetPath);
//
//     try {
//       await fs.unlink(absolutePath);
//     }catch (error){
//       console.log(`error removing the file`,absolutePath)
//       console.log(`error`,error)
//     }
//
//     return successResponse({
//       message: 'Deleted',
//     });
//
//   } catch (error: any) {
//     return errorResponse({
//       message: 'Something Went Wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardDeleteFile;