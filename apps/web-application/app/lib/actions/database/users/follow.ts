'use server';
import { connectToDatabase,userRelationSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const follow = async ({ followId }: { followId: string }) => {
  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }
    await connectToDatabase('follow');



    // const alreadyFollowing = await userSchema.exists({
    //   _id: userId,
    //   following: { $elemMatch: { $eq: followId } },
    // });

    const alreadyFollowing = await userRelationSchema.exists({
      userId,
      following: { $elemMatch: { $eq: followId } },
    });

    if (alreadyFollowing) {
      return errorResponse({
        message: 'Already Following',
      });
    }

    await userRelationSchema.findByIdAndUpdate(userId, { $addToSet: { following: followId } });
    await userRelationSchema.findByIdAndUpdate(followId, { $inc: { followersCount: 1 } });
    return successResponse({});
  } catch (error) {
    console.error(`sendFollowRequest => `, error);
    return errorResponse({});
  }
};

export default follow;