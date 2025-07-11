'use server';
import { IGetUserPagePosts } from '@lib/actions/database/types';
import { connectToDatabase, postSchema } from '@repo/db';

import { postFieldRequestForCards } from '@repo/data-structures';
import { IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

const getUserPagePosts = async ({ authorId, skip = 0, status = 'published', size = 20 }: IGetUserPagePosts) => {
  'use cache';

  try {
    await connectToDatabase('getUserPagePosts');

    let posts = await postSchema
      .find({ $and: [{ author: authorId }, { status }] }, [...postFieldRequestForCards, 'status'], {
        skip: skip || 0,
        limit: size,
      })
      .populate([{ path: 'thumbnail', select: { filePath: 1 } }])
      .lean<IPost[]>()
      .exec();

    const serializedData = JSON.parse(JSON.stringify(posts));
    posts = null;

    cacheTag('cacheItem', `CUserPagePosts-${authorId}-${skip}`);

    return serializedData;
  } catch (error) {
    console.error(`getUserPagePosts=> `, error);
    return [];
  }
};

export default getUserPagePosts;
