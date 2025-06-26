'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';

// Define the interface for clarity and type safety
export interface IUpdateMetas {
  ids: string[];
  status: string;
  type: string; // e.g., 'categories', 'tags'
}

const dashboardUpdateMetasStatus = async ({ ids, status, type }: IUpdateMetas): Promise<ServerActionResponse> => {
  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    if (!ids || ids.length === 0 || !status || !type) {
      return errorResponse({ message: 'Invalid arguments provided.' });
    }

    connection = await connectToDatabase('dashboardUpdateMetasStatus');
    const session = await connection.startSession();

    try {
      // For operations involving multiple related models, a transaction is ideal.
      await session.withTransaction(async () => {
        if (status === 'delete') {
          // --- Deletion Logic ---
          // Step 1: Remove references to these metas from all posts.
          // This prevents posts from having broken relations.
          // The field to update is dynamic based on the 'type' parameter.
          await postSchema.updateMany(
            { [type]: { $in: ids } },
            { $pull: { [type]: { $in: ids } } },
            { session }
          );

          // Step 2: Now that references are removed, delete the meta documents themselves.
          const deleteResult = await metaSchema.deleteMany(
            { _id: { $in: ids }, type },
            { session }
          );

          if (deleteResult.deletedCount !== ids.length) {
            // This will abort the transaction if not all specified metas could be deleted.
            throw new Error('Could not delete all specified metas.');
          }

        } else {
          // --- Status Update Logic ---
          // Use a single `updateMany` for efficiency instead of mapping and awaiting multiple promises.
          await metaSchema.updateMany(
            { _id: { $in: ids }, type },
            { $set: { status } },
            { session }
          );
        }
      });
    } finally {
      // The session is automatically ended by `withTransaction`
      await session.endSession();
    }

    const message = status === 'delete' ? 'Metas deleted successfully' : 'Status updated successfully';
    return successResponse({ message });

  } catch (error) {
    console.error('dashboardUpdateMetasStatus Error =>', error);
    return errorResponse({
      message: 'An error occurred during the operation.',
    });
  }
};

export default dashboardUpdateMetasStatus;

// //dashboardUpdateMetasStatus
// 'use server';
// import { IUpdateMetas } from '@lib/actions/database/types';
// import { verifySession } from '@lib/dal';
// import { errorResponse } from '@lib/actions/response';
// import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
//
// const dashboardUpdateMetasStatus = async ({ ids, status ,type}: IUpdateMetas) => {
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
//       actions = ids.map(async _id => {
//         return metaSchema.findOneAndUpdate({ _id,type }, { $set: { status } });
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
//         return null;
//       });
//     return null;
//   } catch (error) {
//     return null;
//   }
// };
//
// export default dashboardUpdateMetasStatus;