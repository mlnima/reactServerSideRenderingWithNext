'use cache';
import { connectToDatabase, userSchema, postSchema } from '@repo/db';
import { notFound, unstable_rethrow } from 'next/navigation';
import {
  unstable_cacheTag as cacheTag,
} from 'next/cache';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

interface IGetUserInitialPageData {
  username: string;
  userWhoRequestIt: string;
}

export const getUserInitialPageData = async ({
                                               username,
                                               userWhoRequestIt,
                                             }: IGetUserInitialPageData) => {
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
    cacheTag('cacheItem', `CUser-${username}`);

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
  try {
    await connectToDatabase('getUserInitialPageData');

    const user = await userSchema.findById(userId).lean()

    if (!user) {
      console.log('\x1b[33m%s\x1b[0m', 'NO USER FOUND');
      return null;
    }

    const data = {
      _id: user._id.toString(),
      didThisUserBlockRequester: user.blockList ? user.blockList.includes(userWhoRequestIt) : false,
      isFollowed: user.followers ? user.followers.includes(userWhoRequestIt) : false
    }

    cacheTag('cacheItem', `CUserPageInitial-${data._id}`);

  } catch (error) {

  }
};


export const getInitialUserPageData = async (username: string | undefined) => {
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
    console.log('\x1b[33m%s\x1b[0m', 'data => ', data);
    cacheTag('cacheItem', `CUserPageInitial-${data._id}`);

    return data;
  } catch (error) {
    unstable_rethrow(error);
    console.error(`getInitialUserPageData => `, error);
    return null;
  }
};