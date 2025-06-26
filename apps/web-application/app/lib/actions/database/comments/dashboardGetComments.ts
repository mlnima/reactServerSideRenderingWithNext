'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, commentSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IComment } from '@repo/typescript-types';


const dashboardGetComments = async (
  {
    keyword,
    status,
    page = 1,
    size,
    sort = '-createdAt',
  }: {
    keyword?: string;
    status?: string;
    page?: number;
    size?: number;
    sort?: string;
  },
): Promise<ServerActionResponse<{
  comments: IComment[];
  totalCount: number;
} | null>> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    // This is a separate server action and manages its own connection.
    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    connection = await connectToDatabase('dashboardGetComments');
    const session = await connection.startSession();

    try {
      const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
      const statusQuery = status ? [{ status }] : [];
      const searchQuery = !decodedKeyword
        ? []
        : [{
          $or: [
            { author: new RegExp(decodedKeyword, 'i') },
            { email: new RegExp(decodedKeyword, 'i') },
            { body: new RegExp(decodedKeyword, 'i') }
          ]
        }];

      const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
      const findQuery = { $and: [...searchQuery, ...statusQuery] };

      let comments = await commentSchema
        .find(findQuery, {}, {
          skip: page ? limit * (page - 1) : 0,
          limit: limit,
          sort: sort || '-updatedAt',
        })
        .populate([
          { path: 'author', select: { username: 1 } },
          { path: 'onDocumentId', select: { title: 1, postType: 1 } },
        ])
        .session(session)
        .lean<IComment[]>();

      const totalCount = await commentSchema
        .countDocuments(findQuery, { session });

      const serializedData = {
        comments: JSON.parse(JSON.stringify(comments)),
        totalCount,
      };

      // Clean up reference
      comments = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error('dashboardGetComments Error =>', error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetComments;











// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { connectToDatabase, commentSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { IInitialSettings } from '@repo/typescript-types';
//
//
// const dashboardGetComments = async (
//   {
//     keyword,
//     status,
//     // onDocument,
//     page = 1,
//     size,
//     sort = '-createdAt',
//   }: any) => {
//
//   const { isAdmin } = await verifySession();
//
//   if (!isAdmin) {
//     return errorResponse({
//       message: 'Unauthorized Access',
//     });
//   }
//
//   await connectToDatabase('dashboardGetMetas');
//
//   const { initialSettings } = unwrapResponse(
//     await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//       initialSettings: IInitialSettings | undefined;
//     }>,
//   );
//
//   const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
//
//
//   const statusQuery = status ? [{ status }] : [];
//
//
//   const searchQuery = !decodedKeyword
//     ? []
//     : [{ $or: [{ author: new RegExp(decodedKeyword, 'i') }, { email: new RegExp(decodedKeyword, 'i') }, { body: new RegExp(decodedKeyword, 'i') }] }];
//
//   const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
//
//   const findQuery = { $and: [...searchQuery, ...statusQuery] };
//
//
//   const comments = await commentSchema
//     .find(findQuery, {}, {
//       skip: page ? (limit || 20) * (page - 1) : 0,
//       limit: size || 20,
//       sort: sort || '-updatedAt',
//     })
//     .populate([
//       { path: 'author', select: { username: 1 } },
//       { path: 'onDocumentId', select: { title: 1, postType: 1 } },
//     ])
//     .lean();
//   const totalCount = await commentSchema
//     .countDocuments(findQuery);
//
//   return successResponse({
//     data: {
//       comments: JSON.parse(JSON.stringify(comments)),
//       totalCount,
//     },
//   });
//
// };
//
// export default dashboardGetComments;