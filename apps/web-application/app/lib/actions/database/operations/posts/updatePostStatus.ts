'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { postSchema } from '@repo/db';

const updatePostStatus = async ({ _id, status }: { _id: string, status: string }) => {
  try {
    const { isAuth, userId, isAdmin } = await verifySession();
    if (!isAuth || status === 'delete') {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    const post = await postSchema.findById(_id).select(['author']);

    if (!post) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    if (isAdmin || userId === post?.author) {
      await postSchema.findByIdAndUpdate(_id, { $set: { status } });
      return successResponse({
        message: 'Saved',
      });
    }

    return errorResponse({
      message: 'Something went wrong please try again later',
    });


  } catch (error) {
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default updatePostStatus;