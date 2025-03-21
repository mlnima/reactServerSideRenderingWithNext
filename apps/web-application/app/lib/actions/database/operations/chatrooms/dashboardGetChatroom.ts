'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';


interface IDashboardGetChatroom {
  _id: string,
}

const dashboardGetChatroom = async (
  {
    _id,
  }: IDashboardGetChatroom,
) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetChatrooms');

    let chatroom = await chatroomSchema.findById(_id);

    if (!chatroom) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    if (chatroom?._id) {
      chatroom._id = chatroom._id.toString();
    }

    return successResponse({
      data: {
        chatroom,
      },
    });

  } catch (error) {

    console.log(`error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetChatroom;













