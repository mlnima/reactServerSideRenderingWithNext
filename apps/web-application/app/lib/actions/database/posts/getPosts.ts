'use server';
import { IGetPosts } from '@lib/actions/database/types';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IMeta, IPost } from '@repo/typescript-types';
import { Document } from 'mongoose';
import { postFieldRequestForCards } from '@repo/data-structures';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { Types } from 'mongoose';

// Helper function to validate MongoDB ObjectId
const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);
};

// Helper function to sanitize and validate metaId input
const validateMetaId = (metaId: string | undefined): { isValid: boolean; sanitized: string | null; reason?: string } => {
  if (!metaId) {
    return { isValid: true, sanitized: null };
  }

  // Decode URL encoding
  let decoded;
  try {
    decoded = decodeURIComponent(metaId).trim();
  } catch (error) {
    console.warn(`Invalid URL encoding in metaId: ${metaId}`);
    return { isValid: false, sanitized: null, reason: 'Invalid URL encoding' };
  }

  // Check if it's empty after decoding
  if (!decoded) {
    return { isValid: true, sanitized: null };
  }

  // Check if it contains multiple values (comma-separated)
  if (decoded.includes(',')) {
    console.warn(`Multiple values in metaId not supported: ${decoded}`);
    return { isValid: false, sanitized: null, reason: 'Multiple values not supported' };
  }

  // Check if it's a valid ObjectId
  if (!isValidObjectId(decoded)) {
    console.warn(`Invalid ObjectId format: ${decoded}`);
    return { isValid: false, sanitized: null, reason: 'Invalid ObjectId format' };
  }

  return { isValid: true, sanitized: decoded };
};

const getPosts = async (
  {
    locale,
    metaId,
    postType,
    page = 1,
    count,
    author,
    sort = '-createdAt',
    returnPosts = true,
    returnTotalCount = true,
    status = 'published',
  }: IGetPosts): Promise<ServerActionResponse<{
  posts: IPost[],
  totalCount: number,
  meta: IMeta | null,
} | null >> => {
  'use cache';
  try {
    await connectToDatabase('getPosts');

    // Validate metaId input
    const { isValid, sanitized: validatedMetaId, reason } = validateMetaId(metaId);
    if (!isValid) {
      console.error(`getPosts: Invalid metaId - ${reason}: ${metaId}`);
      return errorResponse({
        message: 'Invalid meta ID provided',
      });
    }

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const limit = count || initialSettings?.contentSettings?.contentPerPage || 20;

    // Only try to find meta if we have a valid metaId
    let meta: IMeta | null = null;
    if (validatedMetaId) {
      try {
        meta = await metaSchema.findById(validatedMetaId).lean<IMeta>();
        if (!meta) {
          console.warn(`Meta with ID ${validatedMetaId} not found`);
        }
      } catch (error) {
        console.error(`Error finding meta with ID ${validatedMetaId}:`, error);
        return errorResponse({
          message: 'Meta not found',
        });
      }
    }

    // Build query conditions
    const metaQuery = validatedMetaId
      ? [
        {
          $or: [
            { categories: { $in: [validatedMetaId] } },
            { tags: { $in: [validatedMetaId] } },
            { actors: { $in: [validatedMetaId] } },
          ],
        },
      ]
      : [];

    const postTypeQuery = postType ? [{ postType }] : [];
    const authorQuery = author ? [{ author }] : [];
    const statusQuery = status ? [{ status }] : [];

    // Build the final query
    const queryConditions = [
      ...metaQuery,
      ...postTypeQuery,
      ...authorQuery,
      ...statusQuery,
    ];

    const findPostsQueries = queryConditions.length > 0
      ? { $and: queryConditions }
      : {}; // Empty query if no conditions

    let posts = returnPosts
      ? await postSchema
        .find(findPostsQueries, null, {
          skip: limit * (page - 1),
          limit,
          sort,
        })
        .populate<{ thumbnail: { filePath: string } }>([
          { path: 'thumbnail', select: { filePath: 1 } },
        ])
        .select([...postFieldRequestForCards, `translations.${locale}.title`])
        .lean<IPost[]>()
      : [];

    const totalCount = returnTotalCount
      ? await postSchema.countDocuments(findPostsQueries)
      : 0;

    cacheTag(
      'cacheItem',
      `CPosts-${locale}${validatedMetaId ? `-${validatedMetaId}` : ''}${
        page ? `-${page}` : ''
      }${author ? `-${author}` : ''}`,
    );

    return successResponse({
      data: {
        posts: JSON.parse(JSON.stringify(posts)),
        meta: meta ? JSON.parse(JSON.stringify(meta)) : null,
        totalCount,
      },
    });
  } catch (error) {
    console.error(`getPosts Error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPosts;
// 'use server';
// import { IGetPosts } from '@lib/actions/database/types';
// import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
// import getSettings from '@lib/actions/database/settings/getSettings';
// import { IInitialSettings, IMeta, IPost } from '@repo/typescript-types';
// import { Document } from 'mongoose';
// import { postFieldRequestForCards } from '@repo/data-structures';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
//
// const getPosts = async (
//   {
//     locale,
//     metaId,
//     postType,
//     page = 1,
//     count,
//     author,
//     sort = '-createdAt',
//     returnPosts = true,
//     returnTotalCount = true,
//     status = 'published',
//   }: IGetPosts): Promise<ServerActionResponse<{
//   posts: IPost[],
//   totalCount: number,
//   meta: IMeta | null,
// } | null >> => {
//   'use cache';
//   try {
//     await connectToDatabase('getPosts');
//     const { initialSettings } = unwrapResponse(
//       await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
//         initialSettings: IInitialSettings | undefined;
//       }>,
//     );
//     const limit =
//       count || initialSettings?.contentSettings?.contentPerPage || 20;
//     const meta = metaId
//       ? await metaSchema.findById(metaId).lean<IMeta>()
//       : null;
//
//     const metaQuery = metaId
//       ? [
//         {
//           $or: [
//             { categories: { $in: [metaId] } },
//             { tags: { $in: [metaId] } },
//             { actors: { $in: [metaId] } },
//           ],
//         },
//       ]
//       : [];
//     const postTypeQuery = postType ? [{ postType }] : [{}];
//     const authorQuery = author ? [{ author }] : [{}];
//     const statusQuery = status ? [{ status }] : [{}];
//     const findPostsQueries = {
//       $and: [
//         ...metaQuery,
//         ...postTypeQuery,
//         ...authorQuery,
//         ...statusQuery,
//         // { status: 'published' },
//       ],
//     };
//
//
//     let posts = returnPosts
//       ? await postSchema
//         .find(findPostsQueries, null, {
//           skip: limit * (page - 1),
//           limit,
//           sort,
//         })
//         .populate<{ thumbnail: { filePath: string } }>([
//           { path: 'thumbnail', select: { filePath: 1 } },
//         ])
//         .select([...postFieldRequestForCards, `translations.${locale}.title`])
//         .lean<IPost[]>()
//       : [];
//
//     cacheTag(
//       'cacheItem',
//       `CPosts-${locale}${metaId ? `-${metaId}` : ''}${
//         page ? `-${page}` : ''
//       }${author ? `-${author}` : ''}`,
//     );
//
//
//     return successResponse({
//       data: {
//         posts: JSON.parse(JSON.stringify(posts)),
//         meta: metaId ? JSON.parse(JSON.stringify(meta)) : null,
//         totalCount : returnTotalCount ?  await postSchema.countDocuments(findPostsQueries) : 0,
//       },
//     });
//
//   } catch (error) {
//     console.error(`getPosts Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default  getPosts