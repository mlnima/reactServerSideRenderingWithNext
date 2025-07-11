'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { postSchema, connectToDatabase } from '@repo/db';

const updatePostStatus = async ({ _id, status }: { _id: string; status: string }) => {
  try {
    const { isAuth, userId, isAdmin } = await verifySession();
    if (!isAuth || status === 'delete') {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('updatePostStatus');

    const post = await postSchema.findById(_id).select(['author']).exec();

    if (!post) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    if (isAdmin || userId === post.author.toString()) {
      await postSchema.findByIdAndUpdate(_id, { $set: { status } }).exec();
      return successResponse({
        message: 'Saved',
      });
    }

    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  } catch (error) {
    console.error(`updatePostStatus => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default updatePostStatus;
