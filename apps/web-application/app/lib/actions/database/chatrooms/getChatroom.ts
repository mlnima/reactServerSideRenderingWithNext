'use server';
import { chatroomSchema, connectToDatabase, isValidObjectId } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getChatroom = async (identifier: string): Promise<ServerActionResponse<{
  chatroom: IChatroom,
  chatrooms: IChatroom[]
} | null>> => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getChatroom');
    const isValidId = isValidObjectId(identifier);

    const session = await connection.startSession();

    try {
      // Execute queries with session
      let currentChatroom = await chatroomSchema
        .findOne(
          isValidId
            ? { _id: identifier }
            : { name: identifier }
        )
        .select('-messages')
        .session(session)
        .lean<IChatroom>();

      if (!currentChatroom) {
        return errorResponse({ message: 'Not Found' });
      }

      let allTheChatrooms = await chatroomSchema
        .find({})
        .select('name')
        .session(session)
        .lean<IChatroom[]>();

      // Serialize the data to avoid memory references
      const serializedData = {
        chatroom: JSON.parse(JSON.stringify(currentChatroom)),
        chatrooms: JSON.parse(JSON.stringify(allTheChatrooms))
      };

      // Clean up references
      currentChatroom = null;
      allTheChatrooms = null;

      cacheTag('cacheItem', `CChatroom-${serializedData.chatroom._id || identifier}`);
      cacheLife('minutes');

      return successResponse({
        data: serializedData
      });

    } finally {
      // Always end the session
      await session.endSession();
    }

  } catch (error) {
    console.error(`getChatroom => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later'
    });
  }
};

export default getChatroom;








// 'use server';
// import { chatroomSchema, connectToDatabase,isValidObjectId } from '@repo/db';
// import { IChatroom } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// const getChatroom = async (identifier: string): Promise<ServerActionResponse<{
//   chatroom: IChatroom,
//   chatrooms: IChatroom[]
// } | null>> => {
//   'use cache';
//   try {
//     await connectToDatabase('getChatroom');
//     const isValidId = isValidObjectId(identifier);
//
//     let currentChatroom = await chatroomSchema
//       .findOne(
//         isValidId
//           ? { _id: identifier }
//           : { name: identifier },
//       ).select('-messages').lean<IChatroom>();
//
//     if (!currentChatroom) {
//       return errorResponse({ message: 'Not Found' });
//     }
//
//     let allTheChatrooms = await chatroomSchema
//       .find({})
//       .select('name')
//       .lean<IChatroom[]>();
//
//     cacheTag('cacheItem', `CChatroom-${currentChatroom?._id || identifier}`);
//     return successResponse({
//       data: JSON.parse(JSON.stringify({
//         chatroom: currentChatroom,
//         chatrooms: allTheChatrooms
//       }))
//     }
//     );
//   } catch (error) {
//     return errorResponse({});
//   }
// };
//
// export default getChatroom;