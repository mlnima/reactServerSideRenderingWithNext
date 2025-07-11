'use server';
import { postSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

export interface IUpdatePosts {
  ids: string[];
  status: string;
  token: string;
}

export const updatePostsStatus = async ({
  ids,
  status,
}: IUpdatePosts): Promise<
  ServerActionResponse<{
    message: string;
  } | null>
> => {
  try {
    await connectToDatabase('updatePostsStatus');

    if (status === 'delete') {
      //need to remove the images too
      //await postSchema.deleteMany({ _id: { $in: ids } }).session(session);
    } else {
      await postSchema.updateMany({ _id: { $in: ids } }, { $set: { status } }).exec();
    }

    return successResponse({
      data: {
        message: 'All done',
      },
    });
  } catch (error) {
    console.error(`updatePostsStatus => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later.',
    });
  }
};

export default updatePostsStatus;
