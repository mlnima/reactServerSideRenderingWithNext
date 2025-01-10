'use cache';
import {
  commentSchema,
  connectToDatabase,
  isValidObjectId,
  metaSchema,
  postSchema,
  searchKeywordSchema,
} from '@repo/db';
import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
  unstable_noStore as noStore,
} from 'next/cache';

import { postFieldRequestForCards } from '@repo/data-structures';
import { getDefaultLocale, getLocales } from '@repo/shared-util';
import { Comment, Meta, Post } from '@repo/typescript-types';
import mongoose, { Document } from 'mongoose';
import { getSettings } from './settings';

//import { notFound, unstable_rethrow } from 'next/navigation';

interface IOGetPost {
  post?: Post | null;
  relatedPosts: Post[] | null;
}

type IGetComments = {
  onDocument: string | null | undefined;
  skip?: number;
  limit?: number;
};

export const getPost = async (identifier: string): Promise<IOGetPost> => {
  try {
    await connectToDatabase('getPost');
    const isId = isValidObjectId(identifier);

    const findQuery = isId
      ? { _id: identifier }
      : {
          $or: [
            { title: identifier },
            { permaLink: identifier.replaceAll(' ', '-') },
          ],
        };

    const post = await postSchema
      .findOne(findQuery, '-comments -views -likes -disLikes')
      .populate([
        {
          path: 'author',
          select: ['username', 'profileImage', 'role'],
          populate: { path: 'profileImage', model: 'file' },
        },
        { path: 'categories', select: { name: 1, type: 1 } },
        { path: 'images', select: { filePath: 1 }, model: 'file' },
        { path: 'tags', select: { name: 1, type: 1 } },
        { path: 'actors', select: { name: 1, type: 1, imageUrl: 1 } },
        { path: 'thumbnail', select: { filePath: 1 } },
      ])
      .lean({
        virtuals: true,
        transform: (doc: Document) => {
          if (doc?._id) {
            doc._id = doc._id.toString();
          }
          // @ts-expect-error:it's fine
          if (doc?.author?.profileImage?._id) {
            // @ts-expect-error:it's fine
            doc.author.profileImage._id =
              // @ts-expect-error:it's fine
              doc.author.profileImage._id.toString();
          }
          return doc;
        },
      });

    if (post) {
      // @ts-expect-error:it's fine
      const relatedPosts = await postSchema.findRelatedPosts({
        post,
        relatedByFields: ['actors', 'categories', 'tags'],
        limit: 8,
      });

      //no cache life for the post data
      cacheTag('cacheItem', `CPost-${post._id as unknown as string}`);

      return {
        // @ts-expect-error:it's fine
        post,
        relatedPosts,
      };
    } else
      return {
        post: null,
        relatedPosts: null,
      };
  } catch (error) {
    console.error(`getPost => `, error);
    return {
      post: null,
      relatedPosts: null,
    };
  }
};

export const getPostViews = async (_id: string): Promise<number> => {
  try {
    await connectToDatabase('getPostViews');
    const postData = await postSchema.findById(_id).select('views').lean();
    cacheLife('hours');
    cacheTag('cacheItem', `CPostViews-${_id}`);
    return postData?.views || 0;
  } catch (error) {
    console.error(`getPostViews => `, error);
    return 0;
  }
};

export const getPostRating = async (_id: string) => {
  try {
    await connectToDatabase('getPostRating');
    const postData = await postSchema
      .findById(_id)
      .select('likes disLikes -_id')
      .lean();
    // will expire when use like or dislike a post
    cacheTag('cacheItem', `CPostRating-${_id}`);
    return {
      likes: postData?.likes || 0,
      disLikes: postData?.disLikes || 0,
    };
  } catch (error) {
    console.error(`getPostViews => `, error);
    return {
      likes: 0,
      disLikes: 0,
    };
  }
};

interface IGetPosts {
  locale: string;
  metaId?: string;
  postType?: string;
  count?: number;
  page?: number;
  sort?: string;
  author?: string;
  status?: string;
  returnPosts?: boolean;
  returnTotalCount?: boolean;
}

interface IOGetPosts {
  posts: Post[] | null;
  totalCount?: number | null;
  meta?: Meta | null;
}

export const getPosts = async ({
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
}: IGetPosts): Promise<IOGetPosts> => {
  try {
    await connectToDatabase('getPosts');
    const { initialSettings } = await getSettings(['initialSettings']);
    const limit =
      count || initialSettings?.contentSettings?.numberOfCardsPerPage || 20;
    const meta = metaId
      ? await metaSchema.findById(metaId).lean<Meta>({
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

    const totalCount = returnTotalCount
      ? { totalCount: await postSchema.countDocuments(findPostsQueries) }
      : {};

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
          .lean<Post[]>()
      : [];

    posts = posts.map((doc) => {
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    });

    cacheTag(
      'cacheItem',
      `CgetPosts-${locale}${metaId ? `-${metaId}` : ''}${
        page ? `-${page}` : ''
      }${author ? `-${author}` : ''}`
    );

    return {
      posts,
      meta,
      ...totalCount,
    };
  } catch (error) {
    console.error(`error=> `, error);
    return {
      posts: null,
      totalCount: null,
      meta: null,
    };
  }
};

export const getComments = async ({
  onDocument,
  skip = 0,
  limit = 5,
}: IGetComments) => {
  try {
    console.log('\x1b[33m%s\x1b[0m', 'get comments  => ', onDocument);
    await connectToDatabase('getComments');

    const isId = isValidObjectId(onDocument);
    if (!onDocument || !isId) return null;

    let comments = await commentSchema
      .find(
        { onDocumentId: onDocument },
        {},
        {
          skip,
          limit,
          sort: '-createdAt',
        }
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
      .lean<Comment[]>();

    comments = comments.map((doc) => {
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      if (doc.onDocumentId) {
        doc.onDocumentId = doc.onDocumentId.toString();
      }
      if (doc?.author?._id) {
        doc.author._id = doc.author._id.toString();
      }
      if (doc?.author?.profileImage?._id) {
        doc.author.profileImage._id = doc.author.profileImage._id.toString();
      }
      return doc;
    });

    cacheTag(
      'cacheItem',
      `CComments-${onDocument}-${skip}-${limit}`,
      `CComments-${onDocument}`
    );
    // cacheLife('seconds');
    // noStore()
    return comments;
  } catch (error) {
    console.error(`getComments => `, error);
    return [];
  }
};

interface INewComment {
  commentData: {
    body: string;
    onDocumentId: string;
    author: string;
  };
}

// NEED TO BE TESTED FOR SPAM COMMENTS
export const newComment = async ({ commentData }: INewComment) => {
  noStore();
  try {
    if (
      !commentData?.body ||
      !commentData?.onDocumentId ||
      !commentData?.author
    )
      return null;
    await connectToDatabase('newComment');
    const commentObject = {
      body: commentData?.body,
      onDocumentId: new mongoose.Types.ObjectId(commentData?.onDocumentId),
      author: new mongoose.Types.ObjectId(commentData?.author),
    };

    const commentObjectToSave = new commentSchema(commentObject);
    const savedComment = await commentObjectToSave.save();
    if (!savedComment) {
      return null;
    }

    return savedComment._id.toString();
  } catch (error) {
    console.log(`New Comment Error=> `, error);
    return null;
  }
};

interface IDeleteComments {
  ids: string[];
}

export const deleteComments = async ({ ids }: IDeleteComments) => {
  try {
    if (!ids) return null;
    const deletePromises = ids.map((commentId) => {
      return commentSchema
        .findByIdAndDelete(commentId as string, { useFindAndModify: false })
        .exec();
    });

    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.log(`deleteComments=> `, error);
    return null;
  }
};

const saveSearchedKeyword = async (keyword: string, postsCount: number) => {
  if (!keyword) return;
  try {
    await searchKeywordSchema
      .findOneAndUpdate(
        { name: keyword },
        {
          $set: {
            name: keyword,
            count: postsCount,
          },
          // $inc: { searchHits: 1 },
        },
        { upsert: true }
      )
      .exec();
    console.log(`keyword ${keyword} Saved in DB with ${postsCount} result`);
  } catch (error) {
    console.log('error=> ', error);
  }
};

interface IGetSearch {
  sort?: string;
  locale?: string;
  keyword?: string;
  page?: number;
}

export const getSearch = async ({
  keyword,
  page = 1,
  locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
  sort = '-updatedAt -createdAt',
}: IGetSearch) => {
  if (!keyword) return null;
  const defaultLocale = getDefaultLocale();
  const locales = getLocales();
  let targetKeyword = decodeURIComponent(keyword).toLowerCase();

  const size = 20;

  let postsTranslationsSearchQuery = [];
  let metasTranslationsSearchQuery = [];
  if (locale !== defaultLocale) {
    for await (const locale of locales) {
      metasTranslationsSearchQuery.push({
        [`translations.${locale}.name`]: new RegExp(targetKeyword, 'i'),
      });
    }
    for await (const locale of locales) {
      postsTranslationsSearchQuery.push({
        [`translations.${locale}.title`]: new RegExp(targetKeyword, 'i'),
      });
      postsTranslationsSearchQuery.push({
        [`translations.${locale}.description`]: new RegExp(targetKeyword, 'i'),
      });
    }
  }
  const postSearchQuery = {
    $and: [
      {
        $or: [
          { title: new RegExp(targetKeyword, 'i') },
          { description: new RegExp(targetKeyword, 'i') },
          ...postsTranslationsSearchQuery,
        ],
      },
      { status: 'published' },
    ],
  };

  const metasSearchQuery = {
    $and: [
      {
        $or: [
          { name: new RegExp(targetKeyword, 'i') },
          ...metasTranslationsSearchQuery,
        ],
      },
      { status: 'published' },
    ],
  };

  let posts = await postSchema
    .find(postSearchQuery, postFieldRequestForCards, {
      limit: size,
      skip: size * page - size,
      sort,
    })
    .select([...postFieldRequestForCards, `translations.${locale}.title`])
    .lean();

  posts = posts.map((doc) => {
    if (doc._id) {
      doc._id = doc._id.toString();
    }
    return doc;
  });

  const totalCount = await postSchema.countDocuments(postSearchQuery);
  let metas = await metaSchema
    .find(metasSearchQuery, {}, { sort })
    .limit(size)
    .lean();

  metas = metas.map((doc: Document) => {
    if (doc?._id) {
      doc._id = doc._id.toString();
    }
    return doc;
  });

  const { actors, categories, tags } = (metas || []).reduce(
    (acc: { [key: string]: Meta[] }, meta: Meta) => {
      acc[meta?.type] = [...(acc?.[meta?.type] || []), meta];

      return acc;
    },
    { actors: [], categories: [], tags: [] }
  );

  if (totalCount > 0) {
    await saveSearchedKeyword(targetKeyword, totalCount);
  }
  cacheTag('cacheItem', `CPostRating-${targetKeyword}`);
  return {
    posts,
    totalCount,
    actors,
    categories,
    tags,
  };
};

interface IGetUserPagePosts {
  authorId: string;
  status?: string;
  skip?: number;
  totalCount?: boolean;
}

export const getUserPagePosts = async ({
  authorId,
  skip = 0,
  status = 'published',
  totalCount,
}: IGetUserPagePosts) => {
  console.log('\x1b[33m%s\x1b[0m', 'skip => ', skip);
  try {
    const { initialSettings } = await getSettings(['initialSettings']);
    const limit = initialSettings?.contentSettings?.contentPerPage || 20;

    let posts = await postSchema
      .find(
        { $and: [{ author: authorId }, { status }] },
        [...postFieldRequestForCards, 'status'],
        {
          skip: skip || 0,
          limit,
        }
      )
      .populate([{ path: 'thumbnail', select: { filePath: 1 } }])
      .lean();

    posts = posts.map((doc) => {
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    });

    cacheTag('cacheItem', `CUserPagePosts-${authorId}-${skip}`);
    return posts;
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return [];
  }
};
