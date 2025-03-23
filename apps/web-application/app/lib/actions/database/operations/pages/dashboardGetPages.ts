'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, pageSchema } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { deepConvertObjectIdsToStrings } from '@repo/utils-server';

interface IDashboardGetForms {
  keyword?: string,
  page?: number,
  size?: number,
  sort?: string
}

const dashboardGetPages = async (
  {
    keyword,
    page = 1,
    size,
    sort = '-updatedAt',
  }: IDashboardGetForms,
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
        { title: new RegExp(decodedKeyword, 'i') },
        { pageName: new RegExp(decodedKeyword, 'i') },
        { keywords: new RegExp(decodedKeyword, 'i') },
      ],
    }];

    const findQuery = { $and: [...searchQuery] };

    const pages = await pageSchema.find(findQuery, null,
      {
        skip: page ? (limit || 20) * (page - 1) : 0,
        limit: size || 20,
        sort: sort || '-updatedAt',
      }).lean();

    const transformedPages = pages.map((doc) => deepConvertObjectIdsToStrings(doc));

    const totalCount = await pageSchema.countDocuments({});

    return successResponse({
      data: {
        pages: transformedPages,
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

export default dashboardGetPages;