'use server';
import { IMessengerConversationMessage } from '@repo/typescript-types';
import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

interface IGetConversationMessages {
  limit?: number;
  skip: number;
  conversationId: string;
}

const getConversationMessages = async (
  {
    limit = 10,
    skip = 0,
    conversationId,
  }: IGetConversationMessages): Promise<ServerActionResponse<{
  messages: IMessengerConversationMessage[]
} | null>> => {

  let connection;

  try {
    const { isAuth } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    connection = await connectToDatabase('getConversationMessages');
    const session = await connection.startSession();

    try {
      let conversationData = await messengerConversationSchema
        .findById(conversationId)
        .select('messages')
        .populate<{ messages: IMessengerConversationMessage[] }>([ // Add type to populate for better inference
          {
            path: 'messages',
            model: 'messengerConversationMessage',
            options: {
              sort: { createdAt: -1 },
              skip,
              limit,
            },
          },
        ])
        .session(session)
        .lean();

      if (!conversationData) {
        return errorResponse({ message: 'Conversation not found' });
      }

      const serializedData = {
        // Ensure messages is an array even if population fails or is empty
        messages: JSON.parse(JSON.stringify(conversationData.messages || [])),
      };

      // Clean up reference
      conversationData = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getConversationMessages=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getConversationMessages;

// 'use server';
// import {  IMessengerConversationMessage } from '@repo/typescript-types';
// import { connectToDatabase, messengerConversationSchema } from '@repo/db';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { verifySession } from '@lib/dal';
//
// interface IGetConversationMessages {
//   limit?: number,
//   skip: number,
//   conversationId: string
// }
//
// const getConversationMessages = async (
//   {
//     limit = 10,
//     skip = 0,
//     conversationId,
//   }: IGetConversationMessages):Promise<ServerActionResponse<{
//   messages: IMessengerConversationMessage[]
// } | null>> => {
//
//   try {
//     const { isAuth } = await verifySession();
//
//     if (!isAuth) {
//       return errorResponse({
//         message: 'You Need To Log In',
//       });
//     }
//
//     await connectToDatabase('getConversationMessages');
//
//     const conversationData = await messengerConversationSchema
//       .findById(conversationId)
//       .select('messages')
//       .populate([
//         {
//           path: 'messages',
//           model: 'messengerConversationMessage',
//           options: {
//             sort: { createdAt: -1 },
//             skip,
//             limit,
//           },
//         },
//       ]);
//
//
//     return successResponse({
//       data: {
//         messages: JSON.parse(JSON.stringify(conversationData?.messages)),
//       },
//     });
//
//   } catch (error) {
//     console.error(`getUserPagePosts=> `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default getConversationMessages;