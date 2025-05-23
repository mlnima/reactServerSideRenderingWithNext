'use server';
import { connectToDatabase, userEngagementSchema, postSchema } from '@repo/db';
import mongoose from 'mongoose';
import { verifySession } from '@lib/dal';
import { verifyActionDelay } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { cookieSetter } from '@lib/actions/cookieTools';

const ratePost = async ({ _id }: { _id: string }) => {
  try {
    const isDelayActive = await verifyActionDelay();
    if (isDelayActive) {
      return errorResponse({
        message: 'Please wait before performing another action',
      });
    }

    const { isAuth, userId } = await verifySession();
    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('ratePost');
    const postId = new mongoose.Types.ObjectId(_id);
    const userEngagementData = await userEngagementSchema.findOne({ userId });
    const isLiked = !!(userEngagementData && userEngagementData.likedPosts.includes(postId));

    await userEngagementSchema.updateOne(
      { userId },
      isLiked ?
        { $pull: { likedPosts: postId } } :
        { $addToSet: { likedPosts: postId } },
      { upsert: true },
    );

    await postSchema.findByIdAndUpdate(
      postId,
      { $inc: { likes: isLiked ? -1 : 1 } },
      { timestamps: false },
    );

    await cookieSetter({
      name: 'lastAction',
      value: Date.now().toString(),
    });

    return successResponse({});
  } catch (error) {
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default ratePost;