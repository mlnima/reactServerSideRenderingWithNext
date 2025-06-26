'use server';
import { commentSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

export interface IDeleteComments {
  ids: string[];
}

const dashboardDeleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    if (!ids || ids.length === 0) {
      return errorResponse({ message: 'No comment IDs provided.' });
    }

    connection = await connectToDatabase('dashboardDeleteComments');
    const session = await connection.startSession();

    try {
      // Use a transaction to ensure all comments are deleted or none are.
      await session.withTransaction(async () => {
        // The { session } option ensures this operation is part of the transaction.
        const result = await commentSchema.deleteMany(
          { _id: { $in: ids } },
          { session }
        );

        if (result.deletedCount !== ids.length) {
          // This will trigger the transaction to abort.
          throw new Error('Could not delete all specified comments. Transaction rolled back.');
        }
      });
    } finally {
      await session.endSession();
    }

    return successResponse({ message: 'Done' });

  } catch (error) {
    console.log(`dashboardDeleteComments=> `, error);
    return errorResponse({ message: 'Something went wrong please try again later' });
  }
};

export default dashboardDeleteComments;

















// 'use server';
// import { commentSchema } from '@repo/db';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { verifySession } from '@lib/dal';
//
// export interface IDeleteComments {
//   ids: string[];
// }
//
// const dashboardDeleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
//   try {
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//     if (!ids) return errorResponse({ message: 'Something went wrong please try again later' });
//
//     const deletePromises = ids.map((commentId) => {
//       return commentSchema
//         .findByIdAndDelete(commentId as string, { useFindAndModify: false })
//     });
//
//     await Promise.all(deletePromises);
//     return successResponse({ message: 'Done' });
//   } catch (error) {
//     console.log(`deleteComments=> `, error);
//     return errorResponse({ message: 'Something went wrong please try again later' });
//   }
// };
//
// export default dashboardDeleteComments;