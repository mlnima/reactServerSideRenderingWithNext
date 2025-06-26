'use server';
import { commentSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { IComment } from '@repo/typescript-types';

export interface IDeleteComments {
  ids: string[];
}

const deleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
  let connection;

  try {
    const { isAdmin, userId } = await verifySession();

    if (!userId) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    if (!ids || ids.length === 0) {
      return errorResponse({ message: 'Invalid request: No comment IDs provided' });
    }

    connection = await connectToDatabase('deleteComments');
    const session = await connection.startSession();

    try {
      // Start a transaction to ensure atomicity
      await session.withTransaction(async () => {
        const comments = await commentSchema.find({ _id: { $in: ids } }).session(session).lean<IComment[]>();

        if (comments.length === 0) {
          // No comments found for the given IDs, no action needed.
          return;
        }

        const deletableCommentIds = comments
          .filter(comment => isAdmin || comment.author.toString() === userId)
          .map(c => c._id);

        if (deletableCommentIds.length === 0) {
          // This will abort the transaction
          throw new Error('No comments found that you have permission to delete');
        }

        await commentSchema.deleteMany(
          { _id: { $in: deletableCommentIds } },
          { session }
        );
      });
    } finally {
      // The session is always ended, whether the transaction succeeded or failed
      await session.endSession();
    }

    return successResponse({ message: 'Comments deleted successfully' });

  } catch (error: any) {
    console.error('Error in deleteComments:', error);
    // Provide a more specific error message if it came from our permission check
    const errorMessage = error.message === 'No comments found that you have permission to delete'
      ? error.message
      : 'Something went wrong, please try again later';
    return errorResponse({ message: errorMessage });
  }
};

export default deleteComments;










// 'use server';
// import { commentSchema } from '@repo/db';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { verifySession } from '@lib/dal';
//
// export interface IDeleteComments {
//   ids: string[];
// }
//
// const deleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
//   try {
//     const { isAdmin, userId } = await verifySession();
//
//     if (!userId) {
//       return errorResponse({ message: 'Unauthorized Access' });
//     }
//
//     if (!ids || ids.length === 0) {
//       return errorResponse({ message: 'Invalid request: No comment IDs provided' });
//     }
//
//     const comments = await commentSchema.find({ _id: { $in: ids } });
//
//     const deletableComments = comments.filter(comment =>
//       isAdmin || comment.author.toString() === userId
//     );
//
//     if (deletableComments.length === 0) {
//       return errorResponse({ message: 'No comments found that you have permission to delete' });
//     }
//
//     await commentSchema.deleteMany({ _id: { $in: deletableComments.map(c => c._id) } });
//
//     return successResponse({ message: 'Comments deleted successfully' });
//   } catch (error) {
//     console.error('Error in deleteComments:', error);
//     return errorResponse({ message: 'Something went wrong, please try again later' });
//   }
// };
//
// export default deleteComments;
