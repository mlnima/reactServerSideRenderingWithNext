'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import { IChatroom } from '@repo/typescript-types';

const dashboardGetChatrooms = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
  }: {
    keyword?: string;
    page?: number;
    size?: number;
    sort?: string;
  },
): Promise<ServerActionResponse<{
  chatrooms: IChatroom[];
  totalCount: number;
} | null>> => {


  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetChatrooms');

    const limit = size || 20;
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

    const searchQuery = !decodedKeyword ? [] : [{
      $or: [
        { widgetId: new RegExp(decodedKeyword, 'i') },
        { formName: new RegExp(decodedKeyword, 'i') },
      ],
    }];

    const findQuery = { $and: [...searchQuery] };

    let chatrooms = await chatroomSchema.find(findQuery, null,
      {
        skip: page ? (limit || 20) * (page - 1) : 0,
        limit: size || 20,
        sort: sort || '-updatedAt',
      })
      .lean<IChatroom[]>().exec();
    let totalCount = await chatroomSchema.countDocuments({}).exec() as null | number;

    const serializedData = JSON.parse(JSON.stringify({
      chatrooms,
      totalCount,
    }));

    chatrooms = null;
    totalCount = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {
    console.log(`dashboardGetChatrooms Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetChatrooms;


