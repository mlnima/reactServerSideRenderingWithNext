'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';


interface IDashboardUpdateChatroom {
  chatroomData: IChatroom,
}

const dashboardUpdateChatroom = async (
  {
    chatroomData,
  }: IDashboardUpdateChatroom,
): Promise<ServerActionResponse<{ chatroom: IChatroom } | null>> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('dashboardUpdateChatroom');
    const session = await connection.startSession();

    try {
      // Pass the session into the update options
      let updatedChatroom = await chatroomSchema.findByIdAndUpdate(
        chatroomData._id,
        chatroomData,
        { new: true, upsert: true, session }
      );

      const serializedData = {
        chatroom: JSON.parse(JSON.stringify(updatedChatroom)),
      };

      // Clean up reference to the Mongoose document
      updatedChatroom = null;

      return successResponse({
        data: serializedData,
        message: 'Updated',
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {

    console.log(`dashboardUpdateChatroom Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardUpdateChatroom;












// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { chatroomSchema, connectToDatabase } from '@repo/db';
// import { IChatroom } from '@repo/typescript-types';
//
//
// interface IDashboardGetChatroom {
//   chatroomData: IChatroom,
// }
//
// const dashboardUpdateChatroom = async (
//   {
//     chatroomData,
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
//     await connectToDatabase('dashboardUpdateChatroom');
//
//     const updatedChatroom = await chatroomSchema.findByIdAndUpdate(chatroomData._id,chatroomData,{new:true,upsert: true});
//
//     return successResponse({
//       data:{
//         chatroom:JSON.parse(JSON.stringify(updatedChatroom)),
//       },
//       message: 'Updated',
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardUpdateChatroom Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardUpdateChatroom;
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
