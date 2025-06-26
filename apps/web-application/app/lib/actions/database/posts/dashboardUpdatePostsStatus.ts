'use server';
import { IUpdatePosts } from '@lib/actions/database/types';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, postSchema } from '@repo/db';

const dashboardUpdatePostsStatus = async ({ ids, status }: IUpdatePosts): Promise<ServerActionResponse<{ message: string } | null>> => {
  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('updatePostsStatus');
    const session = await connection.startSession();

    try {
      if (status === 'delete') {
        //***** it need to delete post thumbnail as well , Need fix
        // await postSchema.deleteMany({ _id: { $in: ids } }).session(session);
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
    console.error(`dashboardUpdatePostsStatus => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later.',
    });
  }
};

export default dashboardUpdatePostsStatus;

// 'use server';
// import { IUpdatePosts } from '@lib/actions/database/types';
// import { verifySession } from '@lib/dal';
// import { errorResponse } from '@lib/actions/response';
// import { connectToDatabase, postSchema } from '@repo/db';
//
// const dashboardUpdatePostsStatus = async ({ ids, status }: IUpdatePosts) => {
//   try {
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
//     await connectToDatabase('updatePostsStatus');
//
//     let actions;
//
//     if (status === 'delete') {
//       //***** it need to delete post thumbnail from express server, Need fix
//
//
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
//
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
// export default dashboardUpdatePostsStatus;