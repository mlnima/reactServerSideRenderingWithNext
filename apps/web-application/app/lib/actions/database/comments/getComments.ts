'use server';
import { IGetComments } from '@lib/actions/database/types';
import { commentSchema, connectToDatabase, isValidObjectId } from '@repo/db';
import { IComment } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getComments = async (
  {
    onDocument,
    skip = 0,
    limit = 5,
  }: IGetComments): Promise<ServerActionResponse<{ comments: IComment[] } | null>> => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getComments');

    const isId = isValidObjectId(onDocument);
    if (!onDocument || !isId) {
      return errorResponse({
        message: 'Something went wrong please try again later',
      });
    }

    const session = await connection.startSession();

    try {
      let comments = await commentSchema
        .find(
          { onDocumentId: onDocument },
          {},
          {
            skip,
            limit,
            sort: '-createdAt',
          },
        )
        .populate([
          {
            path: 'author',
            select: ['username', 'profileImage'],
            populate: {
              path: 'profileImage',
              model: 'file',
            },
          },
        ])
        .session(session)
        .lean<IComment[]>();

      const serializedData = {
        comments: JSON.parse(JSON.stringify(comments)),
      };

      comments = null;

      cacheTag(
        'cacheItem',
        `CComments-${onDocument}-${skip}-${limit}`,
        `CComments-${onDocument}`,
      );

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`getComments => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getComments;

// 'use server';
// import { IGetComments } from '@lib/actions/database/types';
// import { commentSchema, connectToDatabase,isValidObjectId } from '@repo/db';
// import { IComment } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// const getComments = async (
//   {
//     onDocument,
//     skip = 0,
//     limit = 5,
//   }: IGetComments): Promise<ServerActionResponse<{ comments: IComment[] } | null>> => {
//   'use cache';
//   try {
//     await connectToDatabase('getComments');
//
//     const isId = isValidObjectId(onDocument);
//     if (!onDocument || !isId) {
//       return errorResponse({
//         message: 'Something went wrong please try again later',
//       });
//     }
//
//     let comments = await commentSchema
//       .find(
//         { onDocumentId: onDocument },
//         {},
//         {
//           skip,
//           limit,
//           sort: '-createdAt',
//         },
//       )
//       .populate([
//         {
//           path: 'author',
//           select: ['username', 'profileImage'],
//           populate: {
//             path: 'profileImage',
//             model: 'file',
//           },
//         },
//       ])
//       .lean<IComment[]>();
//
//     console.log(
//       `cacheTag=>`,
//       `CComments-${onDocument}-${skip}-${limit}`,
//       `CComments-${onDocument}`
//       )
//     cacheTag(
//       'cacheItem',
//       `CComments-${onDocument}-${skip}-${limit}`,
//       `CComments-${onDocument}`,
//     );
//
//     return successResponse({
//       data: {
//         comments:JSON.parse(JSON.stringify(comments)),
//       },
//     });
//   } catch (error) {
//     console.error(`getComments => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default getComments;