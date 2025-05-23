'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

//: Promise<ServerActionResponse<{
//   likes: number,
//   disLikes: number
// } | null>>

const getPostRating = async (_id: string) => {
  'use cache';
  try {
    await connectToDatabase('getPostRating');

    const postData = await postSchema
      .findById(_id)
      .select('likes -_id')
      .lean<IPost>();

    cacheTag('cacheItem', `CPostRating-${_id}`);

    return successResponse({
      data: {
        likes: postData?.likes || 0
      }
    });

  } catch (error) {
    console.error(`getPostViews => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPostRating;