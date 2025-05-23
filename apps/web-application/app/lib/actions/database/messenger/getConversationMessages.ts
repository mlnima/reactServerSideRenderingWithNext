'use server';
import {  IMessengerConversationMessage } from '@repo/typescript-types';
import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

interface IGetConversationMessages {
  limit?: number,
  skip: number,
  conversationId: string
}

const getConversationMessages = async (
  {
    limit = 10,
    skip = 0,
    conversationId,
  }: IGetConversationMessages):Promise<ServerActionResponse<{
  messages: IMessengerConversationMessage[]
} | null>> => {

  try {
    const { isAuth } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('getConversationMessages');

    const conversationData = await messengerConversationSchema
      .findById(conversationId)
      .select('messages')
      .populate([
        {
          path: 'messages',
          model: 'messengerConversationMessage',
          options: {
            sort: { createdAt: -1 },
            skip,
            limit,
          },
        },
      ]);


    return successResponse({
      data: {
        messages: JSON.parse(JSON.stringify(conversationData?.messages)),
      },
    });

  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getConversationMessages;