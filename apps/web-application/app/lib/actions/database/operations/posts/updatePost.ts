'use server';
import { IUpdatePost } from '@lib/actions/database/operations/types';
import { jwtValidator } from '@repo/utils-server';
import { JWTPayload } from '@repo/typescript-types';
import { postSchema } from '@repo/db';

const updatePost = async ({ data, token }: IUpdatePost) => {
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

export default updatePost;