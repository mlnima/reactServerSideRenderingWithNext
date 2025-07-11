'use server';
import { commentSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { IComment } from '@repo/typescript-types';

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

    await connectToDatabase('deleteComments');


    const comments = await commentSchema.find({ _id: { $in: ids } }).lean<IComment[]>().exec();

    if (comments.length === 0) {
      return errorResponse({ message: 'No Comment Found' });
    }

    const deletableCommentIds = comments
      .filter(comment => isAdmin || comment.author.toString() === userId)
      .map(c => c._id);

    if (deletableCommentIds.length === 0) {
      return errorResponse({ message: 'No comments found that you have permission to delete' });
    }

    await commentSchema.deleteMany(
      { _id: { $in: deletableCommentIds } },
    ).exec();

    return successResponse({ message: 'Comments deleted successfully' });

  } catch (error: any) {
    console.error('Error in deleteComments:', error);
    return errorResponse({ message: 'Something went wrong, please try again later' });
  }
};

export default deleteComments;

