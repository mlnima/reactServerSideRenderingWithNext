'use server';
import { Types } from 'mongoose';
import { connectToDatabase, userSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, successResponse } from '@lib/actions/response';

interface IGetLoadedUserPageData {
  userId: string | Types.ObjectId,
  userWhoRequestIt: string | Types.ObjectId,
}

 const getLoadedUserPageData = async (
  {
    userId,
    userWhoRequestIt,
  }: IGetLoadedUserPageData) => {
  // "use cache"
  try {
    await connectToDatabase('getLoadedUserPageData');

    // Perform all checks using a single query for each user
    const [targetUser, requestingUser] = await Promise.all([
      userSchema.findOne(
        { _id: userId },
        {
          _id: 1,
          blockList: { $elemMatch: { $eq: userWhoRequestIt } },
          following: { $elemMatch: { $eq: userWhoRequestIt } },
        },
      ),
      userSchema.findOne(
        { _id: userWhoRequestIt },
        {
          _id: 1,
          blockList: { $elemMatch: { $eq: userId } },
          following: { $elemMatch: { $eq: userId } },
        },
      ),
    ]);

    // Convert results into boolean values
    const loadedUserPageData = {
      isBlockedByTargetUser: !!targetUser?.blockList?.length,
      isFollowedByTargetUser: !!targetUser?.following?.length,
      isBlocked: !!requestingUser?.blockList?.length,
      isFollowed: !!requestingUser?.following?.length,
    };

    // cacheTag('cacheItem', `CUserPageLoaded-${userId}-${userWhoRequestIt}`);


    return successResponse({ data:{
       loadedUserPageData
      } })

  } catch (error) {
    console.error(`getLoadedUserPageData => `, error);

    return errorResponse({
      message:"Something went wrong please try again later"
    })
  }
};


export default getLoadedUserPageData;