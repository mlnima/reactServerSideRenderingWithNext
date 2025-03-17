'use server';
import { connectToDatabase, userSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const unfollow = async ({ unfollowId }: { unfollowId: string }) => {
  try {
    const { isAuth ,userId} = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }
    await connectToDatabase('unfollow');

    const alreadyFollowing = await userSchema.exists({
      _id: userId,
      following: { $elemMatch: { $eq: unfollowId } },
    });

    if (!alreadyFollowing) {
      return errorResponse({
        message: 'Something went wrong please try again later',
      });
    }

    await userSchema.findByIdAndUpdate(userId, { $pull: { following: unfollowId } });
    await userSchema.findByIdAndUpdate(unfollowId, { $inc: { followersCount: -1 } });
    return successResponse({});
  } catch (error) {
    console.error(`sendFollowRequest => `, error);
    return errorResponse({});
  }
};

export default unfollow;