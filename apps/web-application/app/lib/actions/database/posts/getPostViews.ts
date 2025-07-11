'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';

const getPostViews = async (_id: string): Promise<number> => {
  'use cache';

  try {
    await connectToDatabase('getPostViews');

    let postData = await postSchema.findById(_id).select('views').lean<{ views?: number }>().exec();

    const views = postData?.views || 0;
    postData = null;

    cacheTag('cacheItem', `CPostViews-${_id}`);
    cacheLife('hours');

    return views;
  } catch (error) {
    console.error(`getPostViews => `, error);
    return 0;
  }
};

export default getPostViews;
