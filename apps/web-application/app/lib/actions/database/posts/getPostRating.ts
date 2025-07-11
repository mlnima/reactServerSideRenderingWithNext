'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, successResponse } from '@lib/actions/response';

const getPostRating = async (_id: string) => {
  'use cache';

  try {
    await connectToDatabase('getPostRating');

    let postData = await postSchema.findById(_id).select('likes -_id').lean<IPost>().exec();

    const serializedData = {
      likes: postData?.likes || 0,
    };

    postData = null;

    cacheTag('cacheItem', `CPostRating-${_id}`);

    return successResponse({
      data: serializedData,
    });
  } catch (error) {
    console.error(`getPostRating => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPostRating;
