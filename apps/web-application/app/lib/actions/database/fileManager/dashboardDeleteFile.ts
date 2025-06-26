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

  let connection;

  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    connection = await connectToDatabase('dashboardDeleteFile');
    const session = await connection.startSession();

    let fileFound = false;

    try {
      // Use a transaction to ensure database operations are atomic.
      // If any operation fails, all are rolled back.
      await session.withTransaction(async () => {
        const fileData = await fileSchema.findOne({ filePath: targetPath }).session(session).lean<IFile>();

        if (fileData) {
          fileFound = true;
          // If the file is used as a post thumbnail, remove the reference from the post.
          if (fileData.usageType === 'postThumbnail') {
            await postSchema.findOneAndUpdate(
              { thumbnail: fileData._id },
              { $unset: { thumbnail: '' } },
              { session }
            );
          }
          // Now, delete the file document itself.
          await fileSchema.findByIdAndDelete(fileData._id, { session });
        }
      });
    } finally {
      // Always end the session, regardless of whether the transaction succeeded or failed.
      await session.endSession();
    }

    // Only attempt to delete the physical file if it was found and removed from the database.
    if (fileFound) {
      const absolutePath = path.join(process.cwd(), '..', 'api-server', targetPath);
      try {
        // The physical file deletion is a side-effect. We attempt it after the DB transaction is complete.
        // If this fails, we log the error but consider the primary operation a success
        // because the database state is now consistent.
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