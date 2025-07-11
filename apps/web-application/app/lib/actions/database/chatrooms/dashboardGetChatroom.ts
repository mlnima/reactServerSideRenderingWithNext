'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';
interface IDashboardGetChatroom {
  _id: string,
}
const dashboardGetChatroom = async (
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

    await connectToDatabase('dashboardGetChatroom');

    let chatroom = await chatroomSchema.findById(_id).lean<IChatroom>().exec();

    if (!chatroom) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    const serializedData = JSON.parse(JSON.stringify({
      chatroom,
    }))

    chatroom = null

    return successResponse({
      data: serializedData,
    });
  } catch (error) {
    console.log(`dashboardGetChatroom Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};
export default dashboardGetChatroom;