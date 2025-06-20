'use server';
import { connectToDatabase, postSchema,isValidObjectId } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { unstable_cacheTag as cacheTag , unstable_cacheLife as cacheLife } from 'next/cache';

const getPost = async (identifier: string): Promise<ServerActionResponse<{
  post: IPost,
  relatedPosts: IPost[]
} | null>> => {
 'use cache'
  try {

    await connectToDatabase('getPost');
    const isId = isValidObjectId(identifier);

    const findQuery = isId
      ? { _id: identifier }
      : {
        $or: [
          { title: identifier },
          { permaLink: identifier.replaceAll(' ', '-') },
        ],
      };

    let post = await postSchema
      .findOne(findQuery, '-comments -views -likes')
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
      .lean<IPost>();

    if (!post) {
      return errorResponse({
        message: 'Not Found',
      });
    }


    // @ts-expect-error:it's fine
    let relatedPosts = await postSchema.findRelatedPosts({
      post,
      relatedByFields: ['actors', 'tags', 'categories'],
      limit: 8,
    });


    //no cache life for the post data
    cacheTag('cacheItem', `CPost-${post._id as unknown as string}`);
    cacheLife('minutes')

    return successResponse({
      data: JSON.parse(JSON.stringify({
        post ,
        relatedPosts,
      }))
    });

  } catch (error) {
    console.error(`getPost => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPost;


