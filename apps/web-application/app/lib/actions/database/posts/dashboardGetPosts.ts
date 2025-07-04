'use server';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, postSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { postStatuses } from '@repo/data-structures';
import { IInitialSettings } from '@repo/typescript-types';

const dashboardGetPosts = async ({ metaId, keyword, status, postType, page, size, sort }: any) => {

  let connection;

  try {
    connection = await connectToDatabase('dashboardGetPosts');
    const session = await connection.startSession();

    try {
      const { initialSettings } = unwrapResponse(
        await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
          initialSettings: IInitialSettings | undefined;
        }>,
      );

      const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;

      const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
      const metaQuery = metaId ?
        [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
      const searchQuery = !decodedKeyword ? [] : [{
        $or: [
          { title: new RegExp(decodedKeyword, 'i') },
          { description: new RegExp(decodedKeyword, 'i') },
          { mainThumbnail: new RegExp(decodedKeyword, 'i') },
          { videoTrailerUrl: new RegExp(decodedKeyword, 'i') },
          { videoUrl: new RegExp(decodedKeyword, 'i') },
          { downloadLink: new RegExp(decodedKeyword, 'i') },
          { iframe: new RegExp(decodedKeyword, 'i') },
          { videoEmbedCode: new RegExp(decodedKeyword, 'i') },
          { videoScriptCode: new RegExp(decodedKeyword, 'i') },
        ],
      }];

      const statusQuery = !status
        ? [{ status: 'published' }]
        : status === 'all'
          ? [{ status: { $ne: 'trash' } }]
          : [{ status: status }];

      const postTypeQuery = postType && postType !== 'all' ? [{ postType }] : [];

      const findQuery = { $and: [...metaQuery, ...searchQuery, ...statusQuery, ...postTypeQuery] };

      const populateOptions = [
        { path: 'author', select: ['username', 'role'] },
        { path: 'actors', select: { name: 1, type: 1 } },
        { path: 'categories', select: { name: 1, type: 1 } },
        { path: 'tags', select: { name: 1, type: 1 } },
        { path: 'thumbnail', select: { filePath: 1 } },
      ];

      const totalCount = await postSchema.countDocuments(findQuery).session(session).exec();

      let posts = await postSchema.find(
        findQuery,
        null,
        {
          skip: page ? (limit || 20) * (page - 1) : 0,
          limit: size || 20,
          sort: sort || '-updatedAt',
        },
      ).populate(populateOptions).session(session).lean();

      let statusesCount = postStatuses.reduce((final: { [key: string]: number }, current: string) => {
        final[current] = 0;
        return final;
      }, {});

      for await (const status of postStatuses) {
        statusesCount[status] = await postSchema.countDocuments({ status }).session(session).lean();
      }

      const serializedData = {
        posts: JSON.parse(JSON.stringify(posts)),
        totalCount,
        statusesCount,
      };

      posts = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {

    console.log(`dashboardGetPosts Error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });

  }
};

export default dashboardGetPosts;


// 'use server';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
// import { connectToDatabase, postSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { postStatuses } from '@repo/data-structures';
// import { IInitialSettings } from '@repo/typescript-types';
//
// const dashboardGetPosts = async ({ metaId, keyword, status, postType, page, size, sort }: any) => {
//   try {
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
//     const metaQuery = metaId ?
//       [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
//     const searchQuery = !decodedKeyword ? [] : [{
//       $or: [
//         { title: new RegExp(decodedKeyword, 'i') },
//         { description: new RegExp(decodedKeyword, 'i') },
//         { mainThumbnail: new RegExp(decodedKeyword, 'i') },
//         { videoTrailerUrl: new RegExp(decodedKeyword, 'i') },
//         { videoUrl: new RegExp(decodedKeyword, 'i') },
//         { downloadLink: new RegExp(decodedKeyword, 'i') },
//         { iframe: new RegExp(decodedKeyword, 'i') },
//         { videoEmbedCode: new RegExp(decodedKeyword, 'i') },
//         { videoScriptCode: new RegExp(decodedKeyword, 'i') },
//       ],
//     }];
//
//     const statusQuery = !status
//       ? [{ status: 'published' }]
//       : status === 'all'
//         ? [{ status: { $ne: 'trash' } }]
//         : [{ status: status }];
//
//     const postTypeQuery = postType && postType !== 'all' ? [{ postType }] : [];
//
//     const findQuery = { $and: [...metaQuery, ...searchQuery, ...statusQuery, ...postTypeQuery] };
//
//     const populateOptions = [
//       { path: 'author', select: ['username', 'role'] },
//       { path: 'actors', select: { name: 1, type: 1 } },
//       { path: 'categories', select: { name: 1, type: 1 } },
//       { path: 'tags', select: { name: 1, type: 1 } },
//       { path: 'thumbnail', select: { filePath: 1 } },
//     ];
//
//     const totalCount = await postSchema.countDocuments(findQuery).exec();
//
//     const posts = await postSchema.find(
//       findQuery,
//       null,
//       {
//         skip: page ? (limit || 20) * (page - 1) : 0,
//         limit: size || 20,
//         sort: sort || '-updatedAt',
//       },
//     ).populate(populateOptions).lean();
//
//     let statusesCount = postStatuses.reduce((final: { [key: string]: number }, current: string) => {
//       final[current] = 0;
//       return final;
//     }, {});
//
//     for await (const status of postStatuses) {
//       statusesCount[status] = await postSchema.countDocuments({ status }).lean();
//     }
//
//     return successResponse({
//       data: {
//         posts: JSON.parse(JSON.stringify(posts)),
//         totalCount,
//         statusesCount,
//       },
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardGetPosts Error=> `, error);
//
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//
//   }
// };
//
// export default dashboardGetPosts;