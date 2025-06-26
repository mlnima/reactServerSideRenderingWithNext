'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IChatroom } from '@repo/typescript-types';

const dashboardGetChatrooms = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
  }: {
    keyword?: string;
    page?: number;
    size?: number;
    sort?: string;
  },
): Promise<ServerActionResponse<{
  chatrooms: IChatroom[];
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

    // This call is to another server action, it manages its own connection.
    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    connection = await connectToDatabase('dashboardGetChatrooms');

    const session = await connection.startSession();

    try {
      const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
      const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

      const searchQuery = !decodedKeyword ? [] : [{
        $or: [
          { widgetId: new RegExp(decodedKeyword, 'i') },
          { formName: new RegExp(decodedKeyword, 'i') },
        ],
      }];

      const findQuery = { $and: [...searchQuery] };

      let chatrooms = await chatroomSchema.find(findQuery, null,
        {
          skip: page ? (limit || 20) * (page - 1) : 0,
          limit: size || 20,
          sort: sort || '-updatedAt',
        })
        .session(session)
        .lean<IChatroom[]>();


      const totalCount = await chatroomSchema.countDocuments({}, { session });

      const serializedData = {
        chatrooms: JSON.parse(JSON.stringify(chatrooms)),
        totalCount,
      };

      // Clean up reference
      chatrooms = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {

    console.log(`dashboardGetChatrooms Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetChatrooms;











// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { chatroomSchema, connectToDatabase } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { IInitialSettings } from '@repo/typescript-types';
//
//
// const dashboardGetChatrooms = async (
//   {
//     keyword,
//     page = 1,
//     size,
//     sort = '-updatedAt',
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
//         { widgetId: new RegExp(decodedKeyword, 'i') },
//         { formName: new RegExp(decodedKeyword, 'i') },
//       ],
//     }];
//
//     const findQuery = { $and: [...searchQuery] };
//
//     const chatrooms = await chatroomSchema.find(findQuery, null,
//       {
//         skip: page ? (limit || 20) * (page - 1) : 0,
//         limit: size || 20,
//         sort: sort || '-updatedAt',
//       }).lean();
//
//
//     const totalCount = await chatroomSchema.countDocuments({});
//
//     return successResponse({
//       data: {
//         chatrooms: JSON.parse(JSON.stringify(chatrooms)),
//         totalCount,
//       },
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardGetChatrooms Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGetChatrooms;
//
//
//
//
//
//
//
//
//
//
//
//
//
