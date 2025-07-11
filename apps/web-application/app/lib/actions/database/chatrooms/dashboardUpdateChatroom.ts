'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';

interface IDashboardUpdateChatroom {
  chatroomData: IChatroom,
}

const dashboardUpdateChatroom = async (
  {
    chatroomData,
  }: IDashboardUpdateChatroom,
): Promise<ServerActionResponse<{ chatroom: IChatroom } | null>> => {

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardUpdateChatroom');

    let updatedChatroom = await chatroomSchema.findByIdAndUpdate(
      chatroomData._id,
      chatroomData,
      { new: true, upsert: true },
    ).lean().exec();

    const serializedData = JSON.parse(JSON.stringify({
      chatroom: updatedChatroom,
    }));

    updatedChatroom = null;

    return successResponse({
      data: serializedData,
      message: 'Updated',
    });

  } catch (error) {
    console.log(`dashboardUpdateChatroom Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardUpdateChatroom;

