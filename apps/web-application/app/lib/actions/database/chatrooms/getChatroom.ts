'use server';
import { chatroomSchema, connectToDatabase,isValidObjectId } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getChatroom = async (identifier: string): Promise<ServerActionResponse<{
  chatroom: IChatroom,
  chatrooms: IChatroom[]
} | null>> => {
  'use cache';
  try {
    await connectToDatabase('getChatroom');
    const isValidId = isValidObjectId(identifier);

    let currentChatroom = await chatroomSchema
      .findOne(
        isValidId
          ? { _id: identifier }
          : { name: identifier },
      ).select('-messages').lean<IChatroom>();

    if (!currentChatroom) {
      return errorResponse({ message: 'Not Found' });
    }

    let allTheChatrooms = await chatroomSchema
      .find({})
      .select('name')
      .lean<IChatroom[]>();

    cacheTag('cacheItem', `CChatroom-${currentChatroom?._id || identifier}`);
    return successResponse({
      data: JSON.parse(JSON.stringify({
        chatroom: currentChatroom,
        chatrooms: allTheChatrooms
      }))
    }
    );
  } catch (error) {
    return errorResponse({});
  }
};

export default getChatroom;