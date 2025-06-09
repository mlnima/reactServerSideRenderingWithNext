'use server';
import { IGetPosts } from '@lib/actions/database/types';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { IInitialSettings, IMeta, IPost } from '@repo/typescript-types';
import { Document } from 'mongoose';
import { postFieldRequestForCards } from '@repo/data-structures';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';

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
    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );
    const limit =
      count || initialSettings?.contentSettings?.contentPerPage || 20;
    const meta = metaId
      ? await metaSchema.findById(metaId).lean<IMeta>()
      : null;

    const metaQuery = metaId
      ? [
        {
          $or: [
            { categories: { $in: [metaId] } },
            { tags: { $in: [metaId] } },
            { actors: { $in: [metaId] } },
          ],
        },
      ]
      : [];
    const postTypeQuery = postType ? [{ postType }] : [{}];
    const authorQuery = author ? [{ author }] : [{}];
    const statusQuery = status ? [{ status }] : [{}];
    const findPostsQueries = {
      $and: [
        ...metaQuery,
        ...postTypeQuery,
        ...authorQuery,
        ...statusQuery,
        // { status: 'published' },
      ],
    };


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

    cacheTag(
      'cacheItem',
      `CPosts-${locale}${metaId ? `-${metaId}` : ''}${
        page ? `-${page}` : ''
      }${author ? `-${author}` : ''}`,
    );


    return successResponse({
      data: {
        posts: JSON.parse(JSON.stringify(posts)),
        meta: metaId ? JSON.parse(JSON.stringify(meta)) : null,
        totalCount : returnTotalCount ?  await postSchema.countDocuments(findPostsQueries) : 0,
      },
    });

  } catch (error) {
    console.error(`getPosts Error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default  getPosts