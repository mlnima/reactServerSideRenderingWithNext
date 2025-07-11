'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';
import { IForm } from '@repo/typescript-types';

const dashboardGetForms = async (
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
  forms: IForm[];
  totalCount: number;
} | null>> => {

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetForms');

    const limit = size || 20;
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';

    const searchQuery = !decodedKeyword ? [] : [{
      $or: [
        { widgetId: new RegExp(decodedKeyword, 'i') },
        { formName: new RegExp(decodedKeyword, 'i') },
      ],
    }];

    const findQuery = { $and: [...searchQuery] };

    let forms = await formSchema.find(findQuery, null,
      {
        skip: page ? limit * (page - 1) : 0,
        limit: limit,
        sort: sort || '-updatedAt',
      })

      .lean<IForm[]>();

    const totalCount = await formSchema.countDocuments(findQuery).exec();

    const serializedData = {
      forms: JSON.parse(JSON.stringify(forms)),
      totalCount,
    };

    forms = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {

    console.log(`dashboardGetForms Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetForms;
