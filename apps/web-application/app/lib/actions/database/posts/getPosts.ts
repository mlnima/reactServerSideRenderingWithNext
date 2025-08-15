'use server';
import { IGetPosts } from '@lib/actions/database/types';
import { connectToDatabase, fileSchema, metaSchema, postSchema } from '@repo/db';
import { IMeta, IPost } from '@repo/typescript-types';
import { postFieldRequestForCards } from '@repo/data-structures';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { Types } from 'mongoose';

const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);
};

const validateMetaId = (
  metaId: string | undefined,
): {
  isValid: boolean;
  sanitized: string | null;
  reason?: string;
} => {
  if (!metaId) {
    return { isValid: true, sanitized: null };
  }

  let decoded;
  try {
    decoded = decodeURIComponent(metaId).trim();
  } catch (error) {
    console.warn(`Invalid URL encoding in metaId: ${metaId}`);
    return { isValid: false, sanitized: null, reason: 'Invalid URL encoding' };
  }

  if (!decoded) {
    return { isValid: true, sanitized: null };
  }

  if (decoded.includes(',')) {
    console.warn(`Multiple values in metaId not supported: ${decoded}`);
    return { isValid: false, sanitized: null, reason: 'Multiple values not supported' };
  }

  if (!isValidObjectId(decoded)) {
    console.warn(`Invalid ObjectId format: ${decoded}`);
    return { isValid: false, sanitized: null, reason: 'Invalid ObjectId format' };
  }

  return { isValid: true, sanitized: decoded };
};

const getPosts = async ({
  locale,
  metaId,
  postType,
  page = 1,
  size = 20,
  author,
  sort = '-createdAt',
  returnPosts = true,
  returnTotalCount = true,
  status = 'published',
}: IGetPosts): Promise<
  ServerActionResponse<{
    posts: IPost[];
    totalCount: number;
    meta: IMeta | null;
  } | null>
> => {
  'use cache';

  try {
    const { isValid, sanitized: validatedMetaId, reason } = validateMetaId(metaId);

    if (!isValid) {
      console.error(`getPosts: Invalid metaId - ${reason}: ${metaId}`);
      return errorResponse({
        message: 'Invalid meta ID provided',
      });
    }

    await connectToDatabase('getPosts');

    let meta: IMeta | null = null;
    if (validatedMetaId) {
      try {
        meta = await metaSchema.findById(validatedMetaId).lean<IMeta>().exec();
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

    const metaQuery = validatedMetaId
      ? [
          {
            $or: [{ categories: { $in: [validatedMetaId] } }, { tags: { $in: [validatedMetaId] } }, { actors: { $in: [validatedMetaId] } }],
          },
        ]
      : [];

    const postTypeQuery = postType ? [{ postType }] : [];
    const authorQuery = author ? [{ author }] : [];
    const statusQuery = status ? [{ status }] : [];

    const queryConditions = [...metaQuery, ...postTypeQuery, ...authorQuery, ...statusQuery];

    const findPostsQueries = queryConditions.length > 0 ? { $and: queryConditions } : {};

    let posts = returnPosts
      ? await postSchema
          .find(findPostsQueries, null, {
            skip: size * (page - 1),
            limit: size,
            sort,
          })
          .select([...postFieldRequestForCards, `translations.${locale}.title`])
          .populate<{ thumbnail: { filePath: string } }>([{ path: 'thumbnail', select: 'filePath' }])
          .lean<IPost[]>()
          .exec()
      : [];
    
    const totalCount = returnTotalCount ? await postSchema.countDocuments(findPostsQueries).exec() : 0;
    const serializedData = JSON.parse(
      JSON.stringify({
        posts,
        meta: meta || null,
        totalCount,
      }),
    );
    // @ts-expect-error: it's fine
    posts = null;
    meta = null;

    const metaCacheTag = validatedMetaId ? `-${validatedMetaId}` : '';
    const pageCacheTag = page ? `-${page}` : '';
    const authorCacheTag = author ? `-${author}` : '';

    cacheTag('cacheItem', `CPosts${metaCacheTag}${pageCacheTag}${authorCacheTag}`);

    return successResponse({
      data: serializedData,
    });
  } catch (error) {
    console.error(`getPosts Error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPosts;


//********** old cache tag with local
// cacheTag(
//   'cacheItem',
//   `CPosts-${locale}${validatedMetaId ? `-${validatedMetaId}` : ''}${
//     page ? `-${page}` : ''
//   }${author ? `-${author}` : ''}`,
// );

