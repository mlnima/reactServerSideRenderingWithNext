'use server';

import { connectToDatabase, messengerConversationSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IMessengerConversation } from '@repo/typescript-types';

interface IGetConversations {
  limit?: number,
  skip: number
}

const getConversations = async ({ limit = 10, skip = 0 }: IGetConversations): Promise<ServerActionResponse<{
  conversations: IMessengerConversation[]
} | null>> => {


  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('getConversations');

    let conversationsList = await messengerConversationSchema
      .find({ users: { $in: [userId] } }, { messages: { $slice: -1 } }, { limit, skip })
      .select('users updatedAt messages')
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
          options: { sort: { createdAt: -1 }, limit: 1 },
        },
      ])

      .lean<IMessengerConversation[]>().exec();

    const serializedData = {
      conversations: conversationsList.length > 0 ? JSON.parse(JSON.stringify(conversationsList)) : [],
    };

    conversationsList = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {
    console.error(`getConversations=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getConversations;

