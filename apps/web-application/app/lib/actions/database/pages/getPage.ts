'use server';
import { pageSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IPage } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

const getPage = async ({ pageName }: { pageName: string }): Promise<ServerActionResponse<{
  pageData: IPage
} | null>> => {
  'use cache';

  let connection;

  try {
    if (!pageName) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    connection = await connectToDatabase('getPage');
    const session = await connection.startSession();

    try {
      let pageData = await pageSchema.findOne({ pageName }).session(session).lean<IPage>();

      if (!pageData) {
        return errorResponse({
          message: 'Not Found',
        });
      }

      const serializedData = {
        pageData: JSON.parse(JSON.stringify(pageData)),
      };

      pageData = null;

      cacheTag('cacheItem', `CPage-${pageName}`);

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getPage => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPage;

// 'use server';
// import { pageSchema, connectToDatabase } from '@repo/db';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { IPage } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
//
// const getPage = async ({ pageName }: { pageName: string }): Promise<ServerActionResponse<{
//   pageData: IPage
// } | null>> => {
//   'use cache';
//   try {
//     if (!pageName) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//     await connectToDatabase('getPage');
//     let pageData = await pageSchema.findOne({ pageName }).lean<IPage>();
//
//     if (!pageData) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     cacheTag('cacheItem', `CPage-${pageName}`);
//
//     return successResponse({
//       data: {
//         pageData: JSON.parse(JSON.stringify(pageData)),
//       },
//     });
//
//   } catch (error) {
//     console.error(`getPage => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default getPage;