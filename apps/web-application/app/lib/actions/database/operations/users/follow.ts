'use server';
import { connectToDatabase, userSchema } from '@repo/db';

const follow = async ({ follower, followed }: { follower:string, followed:string }) => {
  try {
    await connectToDatabase('follow');

    const alreadyFollowing = await userSchema.exists({
      _id: follower,
      following: { $elemMatch: { $eq: followed } },
    });

    if (alreadyFollowing) {
      console.log('User is already followed.');
      return null;
    }

    await userSchema.findByIdAndUpdate(follower, { $addToSet: { following: followed } });
    await userSchema.findByIdAndUpdate(followed, { $inc: { followersCount: 1 } });
    return null;
  } catch (error) {
    console.error(`sendFollowRequest => `, error);
    return null;
  }
};

export default follow;