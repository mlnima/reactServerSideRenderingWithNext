'use server';
import { postSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

export interface IUpdatePosts {
  ids: string[],
  status: string,
  token: string
}

export const updatePostsStatus = async ({ ids, status }: IUpdatePosts): Promise<ServerActionResponse<{ message: string } | null>> => {
  let connection;
  try {
    connection = await connectToDatabase('updatePostsStatus');
    const session = await connection.startSession();

    try {
      if (status === 'delete') {
        //need to remove the images too
        //await postSchema.deleteMany({ _id: { $in: ids } }).session(session);
      } else {
        await postSchema.updateMany({ _id: { $in: ids } }, { $set: { status } }).session(session);
      }

      return successResponse({
        data: {
          message: 'All done',
        }
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`updatePostsStatus => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later.',
    });
  }
};

export default updatePostsStatus;








// 'use server';
// import { postSchema,connectToDatabase } from '@repo/db';
// import fs from 'fs/promises';
// import path from 'path';
//
// export interface IUpdatePosts{
//   ids: string[],
//   status: string,
//   token: string
// }
//
// export const updatePostsStatus = async ({ ids, status }: IUpdatePosts) => {
//   try {
//     await connectToDatabase('updatePostsStatus');
//     let actions;
//
//     if (status === 'delete') {
//       // actions = ids.map(async id => {
//       //   return postSchema
//       //     .findByIdAndDelete(id)
//       //     .exec()
//       //     .then(doc => {
//       //       if (!doc.mainThumbnail.includes('http')) {
//       //         fs.unlinkSync(`.${doc.mainThumbnail}`);
//       //       }
//       //     });
//       // });
//
//       return null;
//     } else {
//       actions = ids.map(async id => {
//         return postSchema.findByIdAndUpdate(id, { $set: { status } });
//       });
//     }
//     Promise.all(actions)
//       .then(() => {
//         return {
//           message: 'all done',
//         };
//       })
//       .catch((error) => {
//
//         return null;
//       });
//
//     return null;
//   } catch (error) {
//     return null;
//   }
// };
//
// export default updatePostsStatus;