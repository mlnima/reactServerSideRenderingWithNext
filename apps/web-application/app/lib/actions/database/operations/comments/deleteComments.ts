'use server';
import { commentSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

export interface IDeleteComments {
  ids: string[];
}

const deleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
  try {
    if (!ids) return errorResponse({ message: 'Something went wrong please try again later' });

    const deletePromises = ids.map((commentId) => {
      return commentSchema
        .findByIdAndDelete(commentId as string, { useFindAndModify: false })
    });

    await Promise.all(deletePromises);
    return successResponse({ message: 'Done' });
  } catch (error) {
    console.log(`deleteComments=> `, error);
    return errorResponse({ message: 'Something went wrong please try again later' });
  }
};

export default deleteComments;