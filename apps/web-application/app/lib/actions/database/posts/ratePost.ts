'use server';
import { connectToDatabase, userEngagementSchema, postSchema } from '@repo/db';
import mongoose from 'mongoose';
import { verifySession, verifyActionDelay } from '@lib/dal';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { cookieSetter } from '@lib/actions/cookieTools';

const ratePost = async ({
  _id,
}: {
  _id: string;
}): Promise<
  ServerActionResponse<{
    result: 'liked' | 'unliked';
  } | null>
> => {
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

    const docExists = await userEngagementSchema.findOne({ userId, likedPosts: postId }, { _id: 1 }).lean().exec();

    const isLiked = !!docExists;

    const updateQuery = isLiked ? { $pull: { likedPosts: postId } } : { $addToSet: { likedPosts: postId } };

    await userEngagementSchema.updateOne({ userId }, updateQuery, { upsert: true }).exec();

    await postSchema.findByIdAndUpdate(postId, { $inc: { likes: isLiked ? -1 : 1 } }, { timestamps: false }).exec();

    await cookieSetter({
      name: 'lastAction',
      value: Date.now().toString(),
    });

    return successResponse({
      data: {
        result: isLiked ? 'unliked' : 'liked',
      },
    });
  } catch (error) {
    console.error(`ratePost => `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default ratePost;
