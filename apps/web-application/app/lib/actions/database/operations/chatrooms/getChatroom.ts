'use server';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { isValidObjectId } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';
import { Document } from 'mongoose';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getChatroom = async (identifier: string): Promise<ServerActionResponse<{
  chatroom: IChatroom,
  chatrooms: IChatroom[]
} | null>> => {
  // 'use cache';
  try {
    await connectToDatabase('getChatroom');
    const isValidId = isValidObjectId(identifier);

    let currentChatroom = await chatroomSchema
      .findOne(
        isValidId
          ? { _id: identifier }
          : { name: identifier },
      ).select('-messages').lean<IChatroom>({
        virtuals: true,
        transform: (doc: Document) => {
          if (doc._id) {
            doc._id = doc._id.toString();
          }
          return doc;
        },
      });

    if (!currentChatroom) {
      return errorResponse({ message: 'Not Found' });
    }

    currentChatroom._id = currentChatroom._id.toString();

    let allTheChatrooms = await chatroomSchema
      .find({})
      .select('name')
      .lean<IChatroom[]>();

    allTheChatrooms = allTheChatrooms.map((doc) => {
      if (doc?._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    });
    // cacheTag('cacheItem', `CChatroom-${currentChatroom?._id || identifier}`);
    return successResponse({ data: { chatroom: currentChatroom, chatrooms: allTheChatrooms } });
  } catch (error) {
    return errorResponse({});
  }
};

export default getChatroom;