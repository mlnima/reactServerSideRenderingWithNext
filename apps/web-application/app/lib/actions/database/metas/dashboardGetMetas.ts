'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { postStatuses } from '@repo/data-structures';
import { connectToDatabase, metaSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IMeta } from '@repo/typescript-types';

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

  let connection;

  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    connection = await connectToDatabase('dashboardGetMetas');
    const session = await connection.startSession();

    try {
      const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
      const typeFilter = { type: metaType };

      const statusQuery = status ? [{ status }] : [];
      const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
      const searchQuery = !decodedKeyword
        ? []
        : [{ name: new RegExp(decodedKeyword, 'i') }]; // Metas have 'name', not 'username' or 'email'.

      const findQuery = { $and: [typeFilter, ...searchQuery, ...statusQuery] };

      // --- Performance Optimization: Run queries concurrently ---

      // 1. Get the list of metas for the current page
      const metasPromise = metaSchema
        .find(findQuery, {}, {
          skip: page ? limit * (page - 1) : 0,
          limit: limit,
          sort: sort || '-updatedAt',
        })
        .session(session)
        .lean<IMeta[]>();

      // 2. Get the total count for the filtered query
      const totalCountPromise = metaSchema.countDocuments(findQuery, { session });

      // 3. Get counts for all statuses using a single aggregation query
      const statusesCountPromise = metaSchema.aggregate([
        { $match: typeFilter },
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]).session(session);

      const [metasResult, totalCount, statusesAggregation] = await Promise.all([
        metasPromise,
        totalCountPromise,
        statusesCountPromise,
      ]);

      // Process the aggregation result into the desired object format
      const statusesCount = postStatuses.reduce((acc: { [key: string]: number }, currentStatus: string) => {
        const found = statusesAggregation.find(item => item._id === currentStatus);
        acc[currentStatus] = found ? found.count : 0;
        return acc;
      }, {});

      let metas = metasResult; // Assign to mutable variable for cleanup

      const serializedData = {
        metas: JSON.parse(JSON.stringify(metas)),
        totalCount,
        statusesCount,
      };

      // Clean up reference
      metas = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.log(`dashboardGetMetas Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetMetas;

// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { postStatuses } from '@repo/data-structures';
// import { connectToDatabase, metaSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { IInitialSettings } from '@repo/typescript-types';
//
//
// const dashboardGetMetas = async (
//   {
//     keyword,
//     status,
//     metaType,
//     page = 1,
//     size,
//     sort = '-updatedAt',
//   }: any) => {
//   try {
//
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
//     await connectToDatabase('dashboardGetMetas');
//
//     const { initialSettings } = unwrapResponse(
//       await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//         initialSettings: IInitialSettings | undefined;
//       }>,
//     );
//
//     const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
//     const type = { type: metaType };
//
//     const statusQuery = status ? [{ status }] : [];
//
//     const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
//     const searchQuery = !decodedKeyword
//       ? []
//       : [{ $or: [{ username: new RegExp(decodedKeyword, 'i') }, { email: new RegExp(decodedKeyword, 'i') }] }];
//
//     let statusesCount = postStatuses.reduce((final: { [key: string]: number }, current: string) => {
//       final[current] = 0;
//       return final;
//     }, {});
//
//     for await (const status of postStatuses) {
//       statusesCount[status] = await metaSchema.countDocuments({ $and: [{ status }, type] }).exec();
//     }
//
//     const findQuery = { $and: [type, ...searchQuery, ...statusQuery] };
//
//     const metas = await metaSchema
//       .find(findQuery, {}, {
//         skip: page ? (limit || 20) * (page - 1) : 0,
//         limit: size || 20,
//         sort: sort || '-updatedAt',
//       }).lean();
//
//     const totalCount = await metaSchema.countDocuments(findQuery);
//
//     return successResponse({
//       data: {
//         metas: JSON.parse(JSON.stringify(metas)),
//         totalCount,
//         statusesCount,
//       },
//     });
//
//   } catch (error) {
//     console.log(`dashboardGetMetas Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGetMetas;