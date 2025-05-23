'use server';
import { commentSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

export interface IDeleteComments {
  ids: string[];
}

const deleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
  try {
    const { isAdmin, userId } = await verifySession();

    if (!userId) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    if (!ids || ids.length === 0) {
      return errorResponse({ message: 'Invalid request: No comment IDs provided' });
    }

    const comments = await commentSchema.find({ _id: { $in: ids } });

    const deletableComments = comments.filter(comment =>
      isAdmin || comment.author.toString() === userId
    );

    if (deletableComments.length === 0) {
      return errorResponse({ message: 'No comments found that you have permission to delete' });
    }

    await commentSchema.deleteMany({ _id: { $in: deletableComments.map(c => c._id) } });

    return successResponse({ message: 'Comments deleted successfully' });
  } catch (error) {
    console.error('Error in deleteComments:', error);
    return errorResponse({ message: 'Something went wrong, please try again later' });
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
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
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
// export default deleteComments;