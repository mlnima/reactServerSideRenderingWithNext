'use server';
import { connectToDatabase, userSchema } from '@repo/db';

const unfollow = async ({ follower, followed }: { follower: string, followed: string }): Promise<null> => {
  try {
    await connectToDatabase('unfollow');

    const alreadyFollowing = await userSchema.exists({
      _id: follower,
      following: { $elemMatch: { $eq: followed } },
    });

    if (!alreadyFollowing) {
      console.log('User is not followed.');
      return null;
    }

    await userSchema.findByIdAndUpdate(follower, { $pull: { following: followed } });
    await userSchema.findByIdAndUpdate(followed, { $inc: { followersCount: -1 } });
    return null;
  } catch (error) {
    console.error(`sendFollowRequest => `, error);
    return null;
  }
};

export default unfollow;