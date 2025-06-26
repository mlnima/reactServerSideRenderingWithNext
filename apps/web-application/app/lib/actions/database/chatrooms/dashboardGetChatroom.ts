'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';

interface IDashboardGetChatroom {
  _id: string,
}

const dashboardGetChatroom = async (
  {
    _id,
  }: IDashboardGetChatroom,
): Promise<ServerActionResponse<{ chatroom: IChatroom } | null>> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('dashboardGetChatroom');

    const session = await connection.startSession();

    try {
      let chatroom = await chatroomSchema.findById(_id).session(session).lean<IChatroom>();

      if (!chatroom) {
        return errorResponse({
          message: 'Not Found',
        });
      }

      const serializedData = {
        chatroom: JSON.parse(JSON.stringify(chatroom)),
      };

      // Clean up reference
      chatroom = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {

    console.log(`dashboardGetChatroom Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetChatroom;











// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { chatroomSchema, connectToDatabase } from '@repo/db';
//
//
// interface IDashboardGetChatroom {
//   _id: string,
// }
//
// const dashboardGetChatroom = async (
//   {
//     _id,
//   }: IDashboardGetChatroom,
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
//     await connectToDatabase('dashboardGetChatrooms');
//
//     let chatroom = await chatroomSchema.findById(_id);
//
//     if (!chatroom) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     if (chatroom?._id) {
//       chatroom._id = chatroom._id.toString();
//     }
//
//     return successResponse({
//       data: {
//         chatroom:JSON.parse(JSON.stringify(chatroom)),
//       },
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardGetChatroom Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGetChatroom;
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
