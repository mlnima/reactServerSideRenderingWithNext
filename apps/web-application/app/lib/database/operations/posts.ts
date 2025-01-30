'use server';
import {
  connectToDatabase,
  isValidObjectId,
  metaSchema,
  postSchema,
  userSchema,
} from '@repo/db';

import {
  unstable_cacheLife as cacheLife,
  unstable_cacheTag as cacheTag,
} from 'next/cache';

import { postFieldRequestForCards } from '@repo/data-structures';
import { JWTPayload, Meta, Post } from '@repo/typescript-types';
import mongoose, { Document } from 'mongoose';
import { getSettings } from './settings';
import {
  IOGetPost,
  IGetPosts,
  IOGetPosts,
  IGetUserPagePosts, INewPost, IGetEditingPost, IUpdatePost, IRatePost,
} from './types';
import { _updateSaveMetas } from './metas';
import { jwtValidator } from '@repo/utils-server';

//import { notFound, unstable_rethrow } from 'next/navigation';

export const viewPost = async (_id: string) => {
  try {
    await connectToDatabase('viewPost');
    await postSchema.findByIdAndUpdate(
      _id,
      { $inc: { views: 1 } },
      { timestamps: false },
    );
    return null
  } catch (error) {
    return null
  }
};

export const getPostViews = async (_id: string): Promise<number> => {
  'use cache';
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

export const ratePost = async ({ token, type, _id }: IRatePost) => {
  try {
    if (!token) return null;
    const tokenData = await jwtValidator(token) as JWTPayload;
    if (!tokenData) return null;
    await connectToDatabase('ratePost');

    const postId = new mongoose.Types.ObjectId(_id);
    const oppositeType = type === 'likes' ? 'disLikes' : 'likes';

    const user = await userSchema.findById(tokenData._id);
    if (!user) return null;

    const userField = type === 'likes' ? 'LikedPosts' : 'disLikedPosts';
    const oppositeField = type === 'likes' ? 'disLikedPosts' : 'LikedPosts';

    const alreadyDone = user[userField].some(id => id.equals(postId));
    const oppositeDone = user[oppositeField].some(id => id.equals(postId));

    let userUpdateQuery = {};
    let postIncQuery = { [type]: 0, [oppositeType]: 0 };

    if (oppositeDone) {
      userUpdateQuery = {
        $pull: { [oppositeField]: postId },
        $addToSet: { [userField]: postId },
      };
      postIncQuery[type] = 1;
      postIncQuery[oppositeType] = -1;
    } else if (alreadyDone) {
      userUpdateQuery = { $pull: { [userField]: postId } };
      postIncQuery[type] = -1;
    } else {
      userUpdateQuery = { $addToSet: { [userField]: postId } };
      postIncQuery[type] = 1;
    }

    await userSchema.findByIdAndUpdate(tokenData._id, userUpdateQuery);
    await postSchema.findByIdAndUpdate(postId, { $inc: postIncQuery });
    return null;
  } catch (error) {
    return null;
  }
};

export const getPost = async (identifier: string): Promise<IOGetPost> => {
  'use cache';
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



export const getPostRating = async (_id: string) => {
  'use cache';
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

export const getPosts = async (
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
  }: IGetPosts): Promise<IOGetPosts> => {
  'use cache';
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


    const transformedPosts = posts.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));

    cacheTag(
      'cacheItem',
      `CgetPosts-${locale}${metaId ? `-${metaId}` : ''}${
        page ? `-${page}` : ''
      }${author ? `-${author}` : ''}`,
    );

    return {
      posts: transformedPosts,
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

export const getUserPagePosts = async (
  {
    authorId,
    skip = 0,
    status = 'published',
  }: IGetUserPagePosts) => {
  'use cache';
  try {
    await connectToDatabase('getUserPagePosts');
    const { initialSettings } = await getSettings(['initialSettings']);
    const limit = initialSettings?.contentSettings?.contentPerPage || 20;

    let posts = await postSchema
      .find(
        { $and: [{ author: authorId }, { status }] },
        [...postFieldRequestForCards, 'status'],
        {
          skip: skip || 0,
          limit,
        },
      )
      .populate([{ path: 'thumbnail', select: { filePath: 1 } }])
      .lean();

    const transformedPosts = posts.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
    }));

    cacheTag('cacheItem', `CUserPagePosts-${authorId}-${skip}`);
    return transformedPosts;
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return [];
  }
};

// export const newPost = async ({ newPost, token }: INewPost) => {
//   try {
//     if (!newPost || !token) {
//       return null;
//     }
//     const tokenData = await jwtValidator(token) as JWTPayload;
//
//     if (newPost?._id !== tokenData._id) {
//       return null;
//     }
//
//     await connectToDatabase('getUserPagePosts');
//
//     const editedNewPost = {
//       ...newPost,
//       tags: newPost.tags ? await _updateSaveMetas(newPost.tags) : [],
//       categories: newPost.categories ? await _updateSaveMetas(newPost.categories) : [],
//       actors: newPost.actors ? await _updateSaveMetas(newPost.actors) : [],
//     };
//
//     const newPostDataToSave = new postSchema(editedNewPost);
//
//     const savedPost = await newPostDataToSave.save();
//
//     if (!savedPost) {
//       return null;
//     }
//
//     return { data: savedPost, message: 'Post Has Been Saved' };
//
//   } catch (error) {
//     console.error(`getUserPagePosts=> `, error);
//     return null;
//   }
// };

export const getEditingPost = async ({ _id, token }: IGetEditingPost) => {
  try {
    if (!_id || !token) {
      return null;
    }
    const tokenData = await jwtValidator(token) as JWTPayload;

    await connectToDatabase('getEditingPost');

    const post = await postSchema
      .findOne({ _id, author: tokenData._id }, '-comments -views -likes -disLikes')
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

    if (!post) {
      return null;
    }
    return post;
  } catch (error) {

    return null;
  }
};

export const updatePost = async ({ data, token }: IUpdatePost) => {
  try {
    if (!data || !token) {
      return null;
    }

    let postData;

    try {
      postData = JSON.parse(data);
    } catch (error) {

    }
    const tokenData = await jwtValidator(token) as JWTPayload;

    const countUserPendingPosts = await postSchema.countDocuments({
      $and: [
        { author: tokenData._id },
        { status: 'pending' },
      ],
    });

    if (countUserPendingPosts >= 10 && !postData._id) {
      return {
        message: 'You can not have more than 5 pending posts. Please wait for previous posts to be approved',
      };
    }


  } catch (error) {
  }
};

// posts = posts.map((doc) => {
//   if (doc._id) {
//     doc._id = doc._id.toString();
//   }
//   return doc;
// });


// posts = posts.map((doc) => {
//   if (doc._id) {
//     doc._id = doc._id.toString();
//   }
//   return doc;
// });

// export const deletePostByAuthor = async ({ postId, token }: IDeletePostByAuthor) => {
//   try {
//     const tokenData = await jwtValidator(token);
//     if (!tokenData || !tokenData?._id) {
//       return null;
//     }
//     await connectToDatabase('deletePostByAuthor');
//
//     const deletingPost = await postSchema
//       .findById(_id)
//       .select('author images')
//       .populate([
//         {
//           path: 'images',
//           select: { filePath: 1 },
//           model: 'file',
//         },
//         {
//           path: 'thumbnail',
//           select: { filePath: 1 },
//           model: 'file',
//         },
//       ])
//       .lean();
//
//     if (deletingPost.author.toString() !== userData._id.toString()) {
//       return {
//         message: 'Unauthorized',
//         type: 'error'
//       };
//     }
//
//     // const isId = isValidObjectId(_id);
//   } catch (error) {
//
//   }
// };

