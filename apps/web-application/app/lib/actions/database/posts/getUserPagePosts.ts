'use server';
import { IGetUserPagePosts } from '@lib/actions/database/types';
import { connectToDatabase, postSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { postFieldRequestForCards } from '@repo/data-structures';
import { IInitialSettings, IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';

const getUserPagePosts = async (
  {
    authorId,
    skip = 0,
    status = 'published',
  }: IGetUserPagePosts) => {
  'use cache';

  let connection;

  try {
    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );
    const limit = initialSettings?.contentSettings?.contentPerPage || 20;

    connection = await connectToDatabase('getUserPagePosts');
    const session = await connection.startSession();

    try {
      let posts = await postSchema
        .find(
          { $and: [{ author: authorId }, { status }] },
          [...postFieldRequestForCards, 'status'],
          {
            skip: skip || 0,
            limit,
          },
        )
        .populate([{ path: 'thumbnail', select: { filePath: 1 } }])
        .session(session)
        .lean<IPost[]>();

      const serializedData = JSON.parse(JSON.stringify(posts));
      posts = null;

      cacheTag('cacheItem', `CUserPagePosts-${authorId}-${skip}`);

      return serializedData;

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return [];
  }
};

export default getUserPagePosts;




// 'use server';
// import { IGetUserPagePosts } from '@lib/actions/database/types';
// import { connectToDatabase, postSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { postFieldRequestForCards } from '@repo/data-structures';
// import { IInitialSettings, IPost } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
//
// const getUserPagePosts = async (
//   {
//     authorId,
//     skip = 0,
//     status = 'published',
//   }: IGetUserPagePosts) => {
//   'use cache';
//   try {
//     await connectToDatabase('getUserPagePosts');
//     const { initialSettings } = unwrapResponse(
//       await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//         initialSettings: IInitialSettings | undefined;
//       }>,
//     );
//     const limit = initialSettings?.contentSettings?.contentPerPage || 20;
//
//     let posts = await postSchema
//       .find(
//         { $and: [{ author: authorId }, { status }] },
//         [...postFieldRequestForCards, 'status'],
//         {
//           skip: skip || 0,
//           limit,
//         },
//       )
//       .populate([{ path: 'thumbnail', select: { filePath: 1 } }])
//       .lean<IPost[]>();
//
//     cacheTag('cacheItem', `CUserPagePosts-${authorId}-${skip}`);
//     return JSON.parse(JSON.stringify(posts));
//   } catch (error) {
//     console.error(`getUserPagePosts=> `, error);
//     return [];
//   }
// };
//
// export default getUserPagePosts;