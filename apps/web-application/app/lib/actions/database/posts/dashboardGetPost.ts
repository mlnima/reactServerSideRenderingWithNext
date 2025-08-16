'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const dashboardGetPost = async (
  _id: string,
): Promise<
  ServerActionResponse<{
    post: IPost;
  } | null>
> => {
  try {
    await connectToDatabase('dashboardGetPost');

    let post = await postSchema
      .findById(_id)
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
        { path: 'video', select: { filePath: 1 } },
      ])

      .lean<IPost>()
      .exec();

    if (!post) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    const serializedData = {
      post: JSON.parse(JSON.stringify(post)),
    };

    post = null;

    return successResponse({ data: serializedData });
  } catch (error) {
    console.error(`getPost => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetPost;
