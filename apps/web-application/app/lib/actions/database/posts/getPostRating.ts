'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, successResponse } from '@lib/actions/response';

const getPostRating = async (_id: string) => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getPostRating');
    const session = await connection.startSession();

    try {
      let postData = await postSchema
        .findById(_id)
        .select('likes -_id')
        .session(session)
        .lean<IPost>();

      const serializedData = {
        likes: postData?.likes || 0,
      };

      postData = null;

      cacheTag('cacheItem', `CPostRating-${_id}`);

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getPostRating => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPostRating;


// 'use server';
// import { connectToDatabase, postSchema } from '@repo/db';
// import { IPost } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, successResponse } from '@lib/actions/response';
//
// const getPostRating = async (_id: string) => {
//   'use cache';
//   try {
//     await connectToDatabase('getPostRating');
//
//     const postData = await postSchema
//       .findById(_id)
//       .select('likes -_id')
//       .lean<IPost>();
//
//     cacheTag('cacheItem', `CPostRating-${_id}`);
//
//     return successResponse({
//       data: {
//         likes: postData?.likes || 0
//       }
//     });
//
//   } catch (error) {
//     console.error(`getPostViews => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default getPostRating;