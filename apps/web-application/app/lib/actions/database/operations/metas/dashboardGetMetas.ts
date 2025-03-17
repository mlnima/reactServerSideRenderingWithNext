'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { postStatuses } from '@repo/data-structures';
import { connectToDatabase, metaSchema } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';

interface IDashboardGetUsers {
  keyword?: string,
  status?: string,
  metaType?: string,
  page?: number,
  size?: number,
  sort?: string
}

const dashboardGetMetas = async (
  {
    keyword,
    status,
    metaType,
    page = 1,
    size,
    sort = '-updatedAt',
  }: IDashboardGetUsers) => {
  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetMetas');

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
    const type = { type: metaType };

    const statusQuery = status ? [{ status }] : [];

    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
    const searchQuery = !decodedKeyword
      ? []
      : [{ $or: [{ username: new RegExp(decodedKeyword, 'i') }, { email: new RegExp(decodedKeyword, 'i') }] }];

    let statusesCount = postStatuses.reduce((final: { [key: string]: number }, current: string) => {
      final[current] = 0;
      return final;
    }, {});

    for await (const status of postStatuses) {
      statusesCount[status] = await metaSchema.countDocuments({ $and: [{ status }, type] }).exec();
    }

    const findQuery = { $and: [type, ...searchQuery, ...statusQuery] };

    const metas = await metaSchema
      .find(findQuery, {}, {
        skip: page ? (limit || 20) * (page - 1) : 0,
        limit: size || 20,
        sort: sort || '-updatedAt',
      }).lean();


    const transformedMetas = metas.map((doc) => ({
      ...doc,
      // @ts-expect-error: its fine
      _id: doc._id.toString(),
    }));

    const totalCount = await metaSchema
      .countDocuments(findQuery);

    return successResponse({
      data: {
        metas: transformedMetas,
        totalCount,
        statusesCount,
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

export default dashboardGetMetas;