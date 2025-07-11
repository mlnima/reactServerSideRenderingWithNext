'use server';
import { IUpdatePosts } from '@lib/actions/database/types';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, postSchema } from '@repo/db';

const dashboardUpdatePostsStatus = async ({
  ids,
  status,
}: IUpdatePosts): Promise<
  ServerActionResponse<{
    message: string;
  } | null>
> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('updatePostsStatus');
    if (status === 'delete') {
      //***** it need to delete post thumbnail as well , Need fix
      // await postSchema.deleteMany({ _id: { $in: ids } }).session(session);
    } else {
      await postSchema.updateMany({ _id: { $in: ids } }, { $set: { status } }).exec();
    }

    return successResponse({
      data: {
        message: 'All done',
      },
    });
  } catch (error) {
    console.error(`dashboardUpdatePostsStatus => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later.',
    });
  }
};

export default dashboardUpdatePostsStatus;
