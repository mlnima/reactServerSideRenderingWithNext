'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';

interface GetAllPublishedPostsResponse {
  posts: IPost[];
  totalCount: number;
}

const getAllPublishedPosts = async (): Promise<ServerActionResponse<GetAllPublishedPostsResponse | null>> => {
  'use cache';

  try {
    await connectToDatabase('getAllPublishedPosts');
    const posts = await postSchema.find({ status: 'published' }, 'title permaLink type status _id').lean<IPost[]>().exec();

    const serializedData = {
      posts: JSON.parse(JSON.stringify(posts)),
      totalCount: posts.length,
    };

    cacheTag('cacheItem', 'CAllPublishedPosts');
    cacheLife('minutes');

    return successResponse({ data: serializedData });
  } catch (error) {
    console.error('getAllPublishedPosts => ', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getAllPublishedPosts;
