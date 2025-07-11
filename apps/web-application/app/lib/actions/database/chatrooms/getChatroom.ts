'use server';
import { chatroomSchema, connectToDatabase, isValidObjectId } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';
import {
  unstable_cacheTag as cacheTag,
  // unstable_cacheLife as cacheLife
} from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getChatroom = async (_id: string): Promise<ServerActionResponse<{
  chatroom: IChatroom,
  chatrooms: IChatroom[]
} | null>> => {
  'use cache';

  if (!_id || !isValidObjectId(_id)) {
    console.log(`isValidObjectId(_id)=> `,isValidObjectId(_id))
    return errorResponse({ message: 'Not Found' })
  }

  try {
    await connectToDatabase('getChatroom');


    let chatrooms = await chatroomSchema
      .find({})
      .select('-messages')
      .lean<IChatroom[]>();

    const serializedData = JSON.parse(JSON.stringify(chatrooms))

    const reducedData = serializedData.reduce((result, current)=>{
      if (current._id.toString() === _id){
        result.chatroom = current
      }
      result.chatrooms = [...(result?.chatrooms || []),current]
      return result
    },{})

    if (!reducedData?.chatroom) {
      return errorResponse({ message: 'Not Found' });
    }

    chatrooms = null;

    cacheTag('cacheItem', `CChatroom-${_id}`);

    return successResponse({
      data: reducedData
    });

  } catch (error) {
    console.error(`getChatroom => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later'
    });
  }
};

export default getChatroom;