
'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, pageSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { deepConvertObjectIdsToStrings } from '@repo/utils-server';

const dashboardGetPages = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
    fields,
  }: any,
) => {
  let connection;
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    connection = await connectToDatabase('dashboardGetPages');
    const session = await connection.startSession();

    try {
      const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
      const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

      const searchQuery = !decodedKeyword ? [] : [{
        $or: [
          { title: new RegExp(decodedKeyword, 'i') },
          { pageName: new RegExp(decodedKeyword, 'i') },
          { keywords: new RegExp(decodedKeyword, 'i') },
        ],
      }];

      const findQuery = { $and: [...searchQuery] };

      let pages = await pageSchema.find(findQuery, null,
        {
          skip: page ? (limit || 20) * (page - 1) : 0,
          limit: size || 20,
          sort: sort || '-updatedAt',
        })
        .select(fields ?? '')
        .session(session)
        .lean();

      const transformedPages = pages.map((doc) => deepConvertObjectIdsToStrings(doc));
      const totalCount = await pageSchema.countDocuments({}).session(session);

      pages = null;

      return successResponse({
        data: {
          pages: transformedPages,
          totalCount,
        },
      });

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.log(`dashboardGetPages Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetPages;







// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { connectToDatabase, pageSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { IInitialSettings } from '@repo/typescript-types';
// import { deepConvertObjectIdsToStrings } from '@repo/utils-server';
//
// const dashboardGetPages = async (
//   {
//     keyword,
//     page = 1,
//     size,
//     sort = '-updatedAt',
//     fields,
//   }: any,
// ) => {
//   try {
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
//     await connectToDatabase('dashboardGetPosts');
//
//     const { initialSettings } = unwrapResponse(
//       await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//         initialSettings: IInitialSettings | undefined;
//       }>,
//     );
//
//     const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
//
//     const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
//
//     const searchQuery = !decodedKeyword ? [] : [{
//       $or: [
//         { title: new RegExp(decodedKeyword, 'i') },
//         { pageName: new RegExp(decodedKeyword, 'i') },
//         { keywords: new RegExp(decodedKeyword, 'i') },
//       ],
//     }];
//
//     const findQuery = { $and: [...searchQuery] };
//
//     const pages = await pageSchema.find(findQuery, null,
//       {
//         skip: page ? (limit || 20) * (page - 1) : 0,
//         limit: size || 20,
//         sort: sort || '-updatedAt',
//       }).select(fields ?? '')
//       .lean();
//
//     const transformedPages = pages.map((doc) => deepConvertObjectIdsToStrings(doc));
//
//     const totalCount = await pageSchema.countDocuments({});
//
//     return successResponse({
//       data: {
//         pages: transformedPages,
//         totalCount,
//       },
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardGetPages Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGetPages;