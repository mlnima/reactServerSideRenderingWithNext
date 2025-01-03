'use cache';
import {
  connectToDatabase,
  postSchema,
  isValidObjectId,
  metaSchema,
  flatArrayOdDocumentToObject,
  flatDocumentToObject,
  commentSchema,
} from '@repo/db';
import {
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
  unstable_noStore as noStore,
} from 'next/cache';
//import { notFound, unstable_rethrow } from 'next/navigation';
import mongoose, { Document } from 'mongoose';
import { Post, Meta, Comment } from '@repo/typescript-types';
import { getSettings } from './settings';
import { postFieldRequestForCards } from '@repo/data-structures';

interface IOGetPost {
  post?: Post | null;
  relatedPosts: Post[] | null;
}

interface IGetPosts {
  locale: string;
  metaId?: string;
  postType?: string;
  count?: number;
  page?: number;
  sort?: string;
  returnPosts?: boolean;
}

type IGetComments = {
  onDocument: string | null | undefined;
  skip?: number;
  limit?: number;
};

interface IOGetPosts {
  posts: Post[] | null;
  totalCount: number | null;
  meta: Meta | null;
}

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

export const getPosts = async ({
  locale,
  metaId,
  postType,
  page = 1,
  count,
  sort = '-createdAt',
  returnPosts = true,
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
    const findPostsQueries = {
      $and: [...metaQuery, ...postTypeQuery, { status: 'published' }],
    };
    const totalCount = await postSchema.countDocuments(findPostsQueries);

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
      `CgetPosts-${locale}${metaId ? `-${metaId}` : ''}${page ? `-${page}` : ''}`
    );
    return {
      posts,
      totalCount,
      meta,
    };
  } catch (error) {
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

export const newComment = async ({ commentData }: INewComment) => {
  try {
    if (
      !commentData?.body ||
      !commentData?.onDocumentId ||
      !commentData?.author
    )
      return null;

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

    // await postSchema
    //     .findByIdAndUpdate(
    //         commentData.onDocumentId,
    //         { $push: { comments: [savedComment._id] } },
    //         { new: true },
    //     )
    //     .exec();
    return savedComment.toObject();
  } catch (error) {
    console.log(`New Comment Error=> `,error)
    return null;
  }
};

// export const getPosts = async ({ locale, metaId, postType, page = 1, count, sort = '-updatedAt' }: IGetPosts): Promise<IOGetPosts> => {
//   try {
//     const { initialSettings } = await getSettings(['initialSettings']);
//     const limit = count || initialSettings?.contentSettings?.contentPerPage || 20;
//
//     const meta = metaId ? await metaSchema.findById(metaId).lean({
//       virtuals: true,
//       transform: (doc) => {
//         if (doc._id) {
//           doc._id = doc._id.toString();
//         }
//         return doc;
//       },
//     }) : null;
//
//     const metaQuery = metaId ? [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
//     const postTypeQuery = postType ? [{ postType: postType }] : [{}];
//     const findPostsQueries = {
//       $and: [...metaQuery, ...postTypeQuery, { status: 'published' }],
//     };
//     const totalCount = await postSchema.countDocuments(findPostsQueries);
//     let posts = await postSchema
//       .find(findPostsQueries, null, {
//         skip: limit * (page - 1),
//         limit,
//         sort,
//       })
//       .populate([{ path: 'thumbnail', select: { filePath: 1 } }])
//       .select([...postFieldRequestForCards, `translations.${locale}.title`])
//       .lean();
//
//     posts = posts.map((doc) => {
//       if (doc._id) {
//         doc._id = doc._id.toString();
//       }
//       return doc;
//     });
//     cacheTag('cacheItem', `CgetPosts-${locale}${metaId? `-${metaId}` : ""}${page? `-${page}` : ''}`);
//     return {
//       posts,
//       totalCount,
//       meta
//     };
//   } catch (error) {
//     return {
//       posts: null,
//       totalCount: null,
//       meta: null,
//     };
//   }
// };
