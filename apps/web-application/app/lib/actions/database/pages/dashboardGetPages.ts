'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, pageSchema } from '@repo/db';

const dashboardGetPages = async ({ keyword, page = 1, size = 20, sort = '-updatedAt', fields }: any) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetPages');

    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

    const searchQuery = !decodedKeyword
      ? []
      : [
          {
            $or: [
              { title: new RegExp(decodedKeyword, 'i') },
              { pageName: new RegExp(decodedKeyword, 'i') },
              { keywords: new RegExp(decodedKeyword, 'i') },
            ],
          },
        ];

    const findQuery = { $and: [...searchQuery] };

    let pages = await pageSchema
      .find(findQuery, null, {
        skip: page ? size * (page - 1) : 0,
        limit: size,
        sort: sort || '-updatedAt',
      })
      .select(fields ?? '')
      .lean()
      .exec();

    const totalCount = await pageSchema.countDocuments().exec();

    pages = null;

    return successResponse({
      data: {
        pages: JSON.parse(JSON.stringify(pages)),
        totalCount,
      },
    });
  } catch (error) {
    console.log(`dashboardGetPages Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetPages;
