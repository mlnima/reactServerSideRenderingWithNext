'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';

interface IDashboardGetChatroom {
  _id: string,
}

// not deleting chatroom atm need to remove the chatroom and messages but also a double confirm button in the dashboard
const dashboardDeleteChatroom = async (
  {
    _id,
  }: IDashboardGetChatroom,
): Promise<ServerActionResponse<{ chatroom: IChatroom } | null>> => {

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardDeleteChatroom');

    let chatroom = await chatroomSchema.findById(_id).lean<IChatroom>();

    if (!chatroom) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    const serializedData = {
      chatroom: JSON.parse(JSON.stringify(chatroom)),
    };

    chatroom = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {

    console.log(`dashboardDeleteChatroom Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardDeleteChatroom;