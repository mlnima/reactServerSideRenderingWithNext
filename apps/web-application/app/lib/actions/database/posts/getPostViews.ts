'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';

const getPostViews = async (_id: string): Promise<number> => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getPostViews');
    const session = await connection.startSession();

    try {
      let postData = await postSchema
        .findById(_id)
        .select('views')
        .session(session)
        .lean() as { views?: number };

      const views = postData?.views || 0;
      postData = null;

      cacheLife('hours');
      cacheTag('cacheItem', `CPostViews-${_id}`);

      return views;

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`getPostViews => `, error);
    return 0;
  }
};

export default getPostViews;




// 'use server';
// import { connectToDatabase, postSchema } from '@repo/db';
// import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from 'next/cache';
//
// const getPostViews = async (_id: string): Promise<number> => {
//   'use cache';
//   try {
//     await connectToDatabase('getPostViews');
//     const postData = await postSchema.findById(_id).select('views').lean() as { views?: number };
//     cacheLife('hours');
//     cacheTag('cacheItem', `CPostViews-${_id}`);
//     return postData?.views || 0;
//   } catch (error) {
//     console.error(`getPostViews => `, error);
//     return 0;
//   }
// };
//
// export default getPostViews;