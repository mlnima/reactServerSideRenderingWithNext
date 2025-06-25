'use server';
import { connectToDatabase, metaSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { metaFieldsRequestForCard } from '@repo/data-structures';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { IInitialSettings, IMeta } from '@repo/typescript-types';

interface IGetMetas {
  locale: string;
  startWith?: string;
  metaType: string;
  page?: number;
  count?: number;
}

const getMetas = async (
  {
    locale,
    startWith,
    metaType,
    page = 1,
    count,
  }: IGetMetas): Promise<ServerActionResponse<{
  metas: IMeta[],
  totalCount: number,
} | null>> => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getMetas');
    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );
    const contentPerPage = initialSettings?.contentSettings?.contentPerPage || 20;

    const notStartWithNumberRegex = /^(?![0-9].*$).*/g;
    const notStartWithAlphabetRegex = /^(?![A-Za-z].*$).*/g;
    const startWithQuery =
      startWith === 'other'
        ? { name: { $regex: notStartWithAlphabetRegex } }
        : !startWith
          ? { name: { $regex: notStartWithNumberRegex } }
          : { name: { $regex: '^' + startWith } };
    const countQuery = { count: { $gt: 0 } };
    let limit = count || contentPerPage;
    if (metaType === 'tags' && limit > 1000) {
      limit = 1000;
    }
    if ((metaType === 'categories' || metaType === 'categories') && limit > 80) {
      limit = 80;
    }
    const type = { type: metaType };
    const statusQuery = { status: 'published' };

    const findQuery = {
      $and: [type, startWithQuery, statusQuery, countQuery],
    };
    const sortQuery = {
      rank: 1,
      updatedAt: -1,
      count: -1,
      createdAt: -1,
    };

    const session = await connection.startSession();

    try {
      const totalCount = await metaSchema.countDocuments(findQuery).session(session);

      let metas = await metaSchema
        .find(
          findQuery,
          null,
          {
            sort: sortQuery,
            limit,
            skip: limit * (page - 1),
          })
        .select([...metaFieldsRequestForCard(metaType, locale), `translations.${locale}.name`])
        .session(session)
        .lean<IMeta[]>();


      const serializedData = {
        metas: JSON.parse(JSON.stringify(metas)),
        totalCount,
      };

      metas = null;

      cacheTag(
        'cacheItem',
        `CGetMetas-${locale}${metaType ? `-${metaType}` : ''}${
          page ? `-${page}` : ''
        }${startWith ? `-${startWith}` : ''}`,
      );

      return successResponse({ data: serializedData });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getMetas => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getMetas;







// 'use server';
// import { connectToDatabase, metaSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { metaFieldsRequestForCard } from '@repo/data-structures';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { IInitialSettings, IMeta } from '@repo/typescript-types';
//
// interface IGetMetas {
//   locale: string;
//   startWith?: string;
//   metaType: string;
//   page?: number;
//   count?: number;
// }
//
//
//  const getMetas = async (
//   {
//     locale,
//     startWith,
//     metaType,
//     page = 1,
//     count
//   }: IGetMetas) :Promise<ServerActionResponse<{
//   metas: IMeta[],
//   totalCount: number,
// } | null>> => {
//   'use cache';
//   try {
//     await connectToDatabase('getMetas');
//     const { initialSettings } = unwrapResponse(
//       await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//         initialSettings: IInitialSettings | undefined;
//       }>,
//     );
//     const contentPerPage = initialSettings?.contentSettings?.contentPerPage || 20;
//
//     const notStartWithNumberRegex = /^(?![0-9].*$).*/g;
//     const notStartWithAlphabetRegex = /^(?![A-Za-z].*$).*/g;
//     const startWithQuery =
//       startWith === 'other'
//         ? { name: { $regex: notStartWithAlphabetRegex } }
//         : !startWith
//           ? { name: { $regex: notStartWithNumberRegex } }
//           : { name: { $regex: '^' + startWith } };
//     const countQuery = { count: { $gt: 0 } };
//     let limit = count || contentPerPage;
//     if (metaType === 'tags' && limit > 1000) {
//       limit = 1000;
//     }
//     if ((metaType === 'categories' || metaType === 'categories') && limit > 80) {
//       limit = 80;
//     }
//     const type = { type: metaType };
//     const statusQuery = { status: 'published' };
//
//     const findQuery = {
//       $and: [type, startWithQuery, statusQuery, countQuery],
//     };
//     const sortQuery = {
//       rank: 1,
//       updatedAt: -1,
//       count: -1,
//       createdAt: -1,
//     };
//
//     const totalCount = await metaSchema.countDocuments(findQuery);
//
//     let metas = await metaSchema
//       .find(
//         findQuery,
//         null,
//         {
//           sort: sortQuery,
//           limit,
//           skip: limit * (page - 1),
//         })
//       .select([...metaFieldsRequestForCard(metaType, locale), `translations.${locale}.name`])
//       .lean<IMeta[]>();
//
//     cacheTag(
//       'cacheItem',
//       `CGetMetas-${locale}${metaType ? `-${metaType}` : ''}${
//         page ? `-${page}` : ''
//       }${startWith ? `-${startWith}` : ''}`,
//     );
//
//     return successResponse({
//       data: {
//         metas:JSON.parse(JSON.stringify(metas)),
//         totalCount,
//       },
//     });
//
//   } catch (error) {
//     console.error(`getPostViews => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default getMetas;