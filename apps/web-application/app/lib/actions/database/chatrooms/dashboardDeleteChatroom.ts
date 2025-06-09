'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';


interface IDashboardGetChatroom {
  _id: string,
}


// not deleting chatroom atm need to remove the chatroom and messages but also a double confirm button in the dashboard
const dashboardDeleteChatroom = async (
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

    /// need to delete me ssages too

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
        chatroom:JSON.parse(JSON.stringify(chatroom)),
      },
    });

  } catch (error) {

    console.log(`dashboardDeleteChatroom Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardDeleteChatroom;













