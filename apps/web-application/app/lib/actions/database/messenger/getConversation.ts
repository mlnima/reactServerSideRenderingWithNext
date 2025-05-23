'use server';

import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IMessengerConversation } from '@repo/typescript-types';

interface IGetConversation {
  conversationId: string,
}

const getConversation = async ({ conversationId }: IGetConversation): Promise<ServerActionResponse<{
  conversation: IMessengerConversation
} | null>> => {

  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('getConversation');

    const conversation = await messengerConversationSchema
      .findOne({ $and: [{ _id: { $in: conversationId } }, { users: { $in: [userId] } }] })
      .select('users messages')
      .populate([
        {
          path: 'users',
          select: ['username', 'profileImage'],
          populate: {
            path: 'profileImage',
            model: 'file',
          },
        },
        {
          path: 'messages',
          model: 'messengerConversationMessage',
          options: { sort: { createdAt: -1 }, limit: 10 },
        },
      ]).lean<IMessengerConversation>();


    if (!conversation) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    return successResponse({
      data: {
        conversation: JSON.parse(JSON.stringify(conversation)),
      },
    });

  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getConversation;