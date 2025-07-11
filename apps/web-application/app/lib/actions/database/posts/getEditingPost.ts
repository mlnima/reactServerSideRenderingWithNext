'use server';
import { IGetEditingPost } from '@lib/actions/database/types';
import { connectToDatabase, postSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IPost } from '@repo/typescript-types/src/Post';
import { verifySession } from '@lib/dal';

const getEditingPost = async ({ _id }: IGetEditingPost): Promise<ServerActionResponse<{ post: IPost } | null>> => {
  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('getEditingPost');

    const post = await postSchema
      .findOne({ _id, author: userId }, '-comments -views -likes -disLikes')
      .populate([
        {
          path: 'author',
          select: ['username', 'profileImage', 'role'],
          populate: { path: 'profileImage', model: 'file' },
        },
        { path: 'categories', select: { name: 1, type: 1 } },
        { path: 'images', select: { filePath: 1 }, model: 'file' },
        { path: 'tags', select: { name: 1, type: 1 } },
        { path: 'actors', select: { name: 1, type: 1, imageUrl: 1 } },
        { path: 'thumbnail', select: { filePath: 1 } },
      ])

      .lean<IPost>()
      .exec();

    if (!post) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    return successResponse({
      data: {
        post: JSON.parse(JSON.stringify(post)),
      },
    });
  } catch (error) {
    console.error(`getEditingPost=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getEditingPost;
