'use server';
import { commentSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

export interface IDeleteComments {
  ids: string[];
}

const dashboardDeleteComments = async ({ ids }: IDeleteComments): Promise<ServerActionResponse> => {
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

    await connectToDatabase('dashboardDeleteComments');

    await commentSchema.deleteMany(
      { _id: { $in: ids } },
    ).exec();

    return successResponse({ message: 'Done' });

  } catch (error) {
    console.log(`dashboardDeleteComments=> `, error);
    return errorResponse({ message: 'Something went wrong please try again later' });
  }
};

export default dashboardDeleteComments;