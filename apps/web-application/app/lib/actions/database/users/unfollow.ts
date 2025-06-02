'use server';
import { connectToDatabase,userRelationSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const unfollow = async ({ unfollowId }: { unfollowId: string }) => {
  try {
    console.log(`unfollow=> `,)
    const { isAuth ,userId} = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }
    await connectToDatabase('unfollow');

    const alreadyFollowing = await userRelationSchema.exists({
      userId,
      following: { $elemMatch: { $eq: unfollowId } },
    });

    if (!alreadyFollowing) {
      return errorResponse({
        message: 'You are not following this user',
      });
    }

    await userRelationSchema.findOneAndUpdate({userId:userId}, { $pull: { following: unfollowId } });
    await userRelationSchema.findOneAndUpdate({userId:unfollowId}, { $inc: { followersCount: -1 } });
    return successResponse({});
  } catch (error) {
    console.error(`sendFollowRequest => `, error);
    return errorResponse({});
  }
};

export default unfollow;