'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IForm } from '@repo/typescript-types';

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

    connection = await connectToDatabase('dashboardGetForms');
    const session = await connection.startSession();

    try {
      const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
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
        .session(session)
        .lean<IForm[]>();

      const totalCount = await formSchema.countDocuments(findQuery, { session });

      const serializedData = {
        forms: JSON.parse(JSON.stringify(forms)),
        totalCount,
      };

      // Clean up reference
      forms = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {

    console.log(`dashboardGetForms Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetForms;

// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { connectToDatabase, formSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { IInitialSettings } from '@repo/typescript-types';
//
// const dashboardGetForms = async (
//   {
//     keyword,
//     page = 1,
//     size,
//     sort = '-updatedAt',
//   }: any,
// ) => {
//   try {
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
//     await connectToDatabase('dashboardGetPosts');
//
//     const { initialSettings } = unwrapResponse(
//       await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//         initialSettings: IInitialSettings | undefined;
//       }>,
//     );
//
//     const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;
//
//     const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
//
//     const searchQuery = !decodedKeyword ? [] : [{
//       $or: [
//         { widgetId: new RegExp(decodedKeyword, 'i') },
//         { formName: new RegExp(decodedKeyword, 'i') },
//       ],
//     }];
//
//     const findQuery = { $and: [...searchQuery] };
//
//     const forms = await formSchema.find(findQuery, null,
//       {
//         skip: page ? (limit || 20) * (page - 1) : 0,
//         limit: size || 20,
//         sort: sort || '-updatedAt',
//       }).lean();
//
//     const totalCount = await formSchema.countDocuments({});
//
//     const data = JSON.parse(JSON.stringify({
//       forms,
//       totalCount,
//     }))
//
//     return successResponse({
//       data,
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardGetForms Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGetForms;