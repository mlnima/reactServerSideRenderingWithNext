'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { chatroomSchema, connectToDatabase } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';


const dashboardGetChatrooms = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
  }: any,
) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetPosts');

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;

    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

    const searchQuery = !decodedKeyword ? [] : [{
      $or: [
        { widgetId: new RegExp(decodedKeyword, 'i') },
        { formName: new RegExp(decodedKeyword, 'i') },
      ],
    }];

    const findQuery = { $and: [...searchQuery] };

    const chatrooms = await chatroomSchema.find(findQuery, null,
      {
        skip: page ? (limit || 20) * (page - 1) : 0,
        limit: size || 20,
        sort: sort || '-updatedAt',
      }).lean();


    const totalCount = await chatroomSchema.countDocuments({});

    return successResponse({
      data: {
        chatrooms: JSON.parse(JSON.stringify(chatrooms)),
        totalCount,
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

export default dashboardGetChatrooms;













