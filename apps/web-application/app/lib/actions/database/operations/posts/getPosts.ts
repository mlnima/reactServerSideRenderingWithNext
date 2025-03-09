'use server';
import { IGetPosts } from '@lib/actions/database/operations/types';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IMeta, IPost } from '@repo/typescript-types';
import { Document } from 'mongoose';
import { postFieldRequestForCards } from '@repo/data-structures';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

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
  // 'use cache';
  try {
    await connectToDatabase('getPosts');
    const { initialSettings } = await getSettings(['initialSettings']);
    const limit =
      count || initialSettings?.contentSettings?.numberOfCardsPerPage || 20;
    const meta = metaId
      ? await metaSchema.findById(metaId).lean<IMeta>({
        virtuals: true,
        transform: (doc: Document) => {
          if (doc._id) {
            doc._id = doc._id.toString();
          }
          return doc;
        },
      })
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


    const transformedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
    }));



    // cacheTag(
    //   'cacheItem',
    //   `CgetPosts-${locale}${metaId ? `-${metaId}` : ''}${
    //     page ? `-${page}` : ''
    //   }${author ? `-${author}` : ''}`,
    // );


    return successResponse({
      data: {
        posts: transformedPosts as IPost[],
        meta,
        totalCount : returnTotalCount ?  await postSchema.countDocuments(findPostsQueries) : 0,
      },
    });

  } catch (error) {
    console.error(`error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default  getPosts