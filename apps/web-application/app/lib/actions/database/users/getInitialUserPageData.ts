'use server';
import { connectToDatabase, userRelationSchema, userSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { unstable_rethrow } from 'next/navigation';
import { IUserEngagement, IUserRelation, User } from '@repo/typescript-types';
import { errorResponse, successResponse } from '@lib/actions/response';

const getInitialUserPageData = async (username: string | undefined) => {
  "use cache"
  try {
    await connectToDatabase('getInitialUserPageData');

    const user = await userSchema.findOne({ username })
      .select([
        'username',
        'role',
        'profileImage',
        'createdAt',
        'status',
        'isVerified',
      ])
      .populate({ path: 'profileImage', model: 'file', select: ['filePath'] })
      .lean<User>();

    if (!user) {
      console.log('\x1b[33m%s\x1b[0m', 'NO USER FOUND');
      return null;
    }

    const userRelationData = await userRelationSchema
      .findOne({ userId:user._id })
      .select([
        'followingCount',
        'followersCount',
        'postsCount',
      ])
      .lean<IUserRelation | null>()

    const userEngagementData = await userRelationSchema
      .findOne({ userId:user._id })
      .select([
        'postsCount',
      ])
      .lean<IUserEngagement | null>()

    const data = {
      _id: user._id.toString(),
      username: user.username,
      role: user.role,
      followingCount: userRelationData?.followingCount || 0,
      followersCount: userRelationData?.followersCount || 0,
      postsCount: userEngagementData?.postsCount || 0,
      profileImage: user.profileImage ? {
        _id: user.profileImage._id.toString(),
        filePath: user.profileImage.filePath,
      } : undefined,
      createdAt: user.createdAt,
      status: user.status,
      isVerified: user.isVerified,
    };

    cacheTag('cacheItem', `CUserPageInitial-${data._id}`);

    return successResponse({
      data:{
        initialUserPageData:data
      }})

  } catch (error) {
    unstable_rethrow(error);
    console.error(`getInitialUserPageData => `, error);

    return errorResponse({
      message:"Something went wrong please try again later"
    })
  }
};

export default getInitialUserPageData;