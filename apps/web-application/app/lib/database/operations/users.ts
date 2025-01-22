"use server"
import { connectToDatabase, userSchema, postSchema } from '@repo/db';
import { unstable_rethrow } from 'next/navigation';
import {
  unstable_cacheTag as cacheTag,
} from 'next/cache';

import { ObjectId } from 'mongodb';

interface IGetUserInitialPageData {
  username: string;
  userWhoRequestIt: string;
}

export const getUserInitialPageData = async (
  {
    username,
    userWhoRequestIt,
  }: IGetUserInitialPageData) => {
  "use cache"
  try {
    await connectToDatabase('getUserInitialPageData');
    const pipeline = [
      {
        $match: { username },
      },
      {
        $lookup: {
          from: 'files',
          localField: 'profileImage',
          foreignField: '_id',
          as: 'profileImage',
        },
      },
      {
        $unwind: {
          path: '$profileImage',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          _id: 1,
          username: 1,
          profileImage: '$profileImage.filePath',
          followersCount: { $size: '$followers' },
          followingCount: { $size: '$following' },
          didThisUserBlockRequester: { $in: [userWhoRequestIt, '$blockList'] },
          isFollowed: { $in: [userWhoRequestIt, '$followers'] },
        },
      },
    ];

    let [userData] = await userSchema.aggregate(pipeline);

    const [didRequesterBlockThisUser, didRequesterFollowThisUser, postsCount] =
      await Promise.all([
        userSchema.exists({ blockList: { $in: [userData._id] } }),
        userSchema.exists({ following: { $in: [userData._id] } }),
        postSchema.countDocuments({
          $and: [{ author: userData._id }, { status: 'published' }],
        }),
      ]);

    userData.didRequesterBlockThisUser = !!didRequesterBlockThisUser;
    userData.didRequesterFollowThisUser = !!didRequesterFollowThisUser;
    userData.postsCount = postsCount;
    userData._id = userData._id.toString();

    if (userData?.profileImage?._id) {
      userData.profileImage._id = userData.profileImage._id.toString();
    }

    //cacheTag('cacheItem', `CUser-${username}`);

    return userData;
  } catch (error) {
    console.error('Error in getUserInitialPageData function:', error);
    return;
  }
};

interface IGetLoadedUserPageData {
  userId: string | ObjectId,
  userWhoRequestIt: string | ObjectId,
}

export const getLoadedUserPageData = async (
  {
    userId,
    userWhoRequestIt,
  }: IGetLoadedUserPageData) => {
  "use cache"
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
    const data = {
      isBlockedByTargetUser: !!targetUser?.blockList?.length,
      isFollowedByTargetUser: !!targetUser?.following?.length,
      isBlocked: !!requestingUser?.blockList?.length,
      isFollowed: !!requestingUser?.following?.length,
    };

    cacheTag('cacheItem', `CUserPageLoaded-${userId}-${userWhoRequestIt}`);

    return data;
  } catch (error) {
    console.error(`getLoadedUserPageData => `, error);
    return null;
  }
};


export const getInitialUserPageData = async (username: string | undefined) => {
  "use cache"
  try {
    await connectToDatabase('getInitialUserPageData');

    const user = await userSchema.findOne({ username })
      .select([
        'username',
        'role',
        'followingCount',
        'followersCount',
        'postsCount',
        'profileImage' +
        'createdAt',
        'status',
        'isVerified',
      ])
      .populate({ path: 'profileImage', model: 'file', select: ['filePath'] })
      .lean();

    if (!user) {
      console.log('\x1b[33m%s\x1b[0m', 'NO USER FOUND');
      return null;
    }

    const data = {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      followingCount: user.followingCount || 0,
      followersCount: user.followersCount || 0,
      postsCount: user.postsCount || 0,
      profileImage: user.profileImage ? {
        _id: user.profileImage._id.toString(),
        filePath: user.profileImage.filePath,
      } : undefined,
      createdAt: user.createdAt,
      status: user.status,
      isVerified: user.isVerified,
    };

    cacheTag('cacheItem', `CUserPageInitial-${data._id}`);

    return data;
  } catch (error) {
    unstable_rethrow(error);
    console.error(`getInitialUserPageData => `, error);
    return null;
  }
};

interface ISendFollowUnfollowRequest {
  follower: string,
  followed: string
}

export const follow = async ({ follower, followed }: ISendFollowUnfollowRequest) => {
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

export const unfollow = async ({ follower, followed }: ISendFollowUnfollowRequest) => {
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

//
// export const getLoadedUserPageData = async (
//   {
//     userId,
//     userWhoRequestIt,
//   }: IGetLoadedUserPageData) => {
//   try {
//     await connectToDatabase('getUserInitialPageData');
//
//     const isBlockedByTargetUser = await userSchema.exists({
//       _id: userId,
//       blockList: { $elemMatch: { $eq: userWhoRequestIt } },
//     }).then(Boolean);
//     const isFollowedByTargetUser = await userSchema.exists({
//       _id: userId,
//       following: { $elemMatch: { $eq: userWhoRequestIt } },
//     }).then(Boolean);
//
//     const isFollowed = await userSchema.exists({
//       _id: userWhoRequestIt,
//       following: { $elemMatch: { $eq: userId } },
//     }).then(Boolean);
//
//     const isBlocked = await userSchema.exists({
//       _id: userWhoRequestIt,
//       following: { $elemMatch: { $eq: userId } },
//     }).then(Boolean);
//
//     const data = {
//       isBlockedByTargetUser,
//       isFollowedByTargetUser,
//       isBlocked,
//       isFollowed,
//     };
//
//     cacheTag('cacheItem', `CUserPageInitial-${userId}-${userWhoRequestIt}`);
//
//     return data;
//   } catch (error) {
//     console.error(`sendFollowRequest => `, error);
//     return null;
//   }
// };
// if (!user) {
//   console.log('\x1b[33m%s\x1b[0m', 'NO USER FOUND');
//   return null;
// }