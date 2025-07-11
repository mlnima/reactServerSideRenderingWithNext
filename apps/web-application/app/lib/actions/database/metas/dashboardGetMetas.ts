'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { postStatuses } from '@repo/data-structures';
import { connectToDatabase, metaSchema } from '@repo/db';

import { IMeta } from '@repo/typescript-types';

const dashboardGetMetas = async (
  {
    keyword,
    status,
    metaType,
    page = 1,
    size,
    sort = '-updatedAt',
  }: {
    keyword?: string;
    status?: string;
    metaType: string;
    page?: number;
    size?: number;
    sort?: string;
  },
): Promise<ServerActionResponse<{
  metas: IMeta[];
  totalCount: number;
  statusesCount: { [key: string]: number };
} | null>> => {


  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }


    await connectToDatabase('dashboardGetMetas');

    const limit = size || 20;
    const typeFilter = { type: metaType };

    const statusQuery = status ? [{ status }] : [];
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
    const searchQuery = !decodedKeyword
      ? []
      : [{ name: new RegExp(decodedKeyword, 'i') }]; // Metas have 'name', not 'username' or 'email'.

    const findQuery = { $and: [typeFilter, ...searchQuery, ...statusQuery] };


    const metasPromise = await metaSchema
      .find(findQuery, {}, {
        skip: page ? limit * (page - 1) : 0,
        limit: limit,
        sort: sort || '-updatedAt',
      })

      .lean<IMeta[]>()
      .exec();


    const totalCountPromise = metaSchema.countDocuments(findQuery);
    
    const statusesCountPromise = metaSchema.aggregate([
      { $match: typeFilter },
      { $group: { _id: '$status', count: { $sum: 1 } } },
    ]).exec();

    const [metasResult, totalCount, statusesAggregation] = await Promise.all([
      metasPromise,
      totalCountPromise,
      statusesCountPromise,
    ]);


    const statusesCount = postStatuses.reduce((acc: { [key: string]: number }, currentStatus: string) => {
      const found = statusesAggregation.find(item => item._id === currentStatus);
      acc[currentStatus] = found ? found.count : 0;
      return acc;
    }, {});

    let metas = metasResult;

    const serializedData = {
      metas: JSON.parse(JSON.stringify(metas)),
      totalCount,
      statusesCount,
    };


    metas = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {
    console.log(`dashboardGetMetas Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetMetas;
