'use server';
import { connectToDatabase, userSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { unstable_rethrow } from 'next/navigation';
import { User } from '@repo/typescript-types';
import { errorResponse, successResponse } from '@lib/actions/response';

const getInitialUserPageData = async (username: string | undefined) => {
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
      .lean<User>();

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

    return successResponse({ data:{
        initialUserPageData:data
      } })
  } catch (error) {
    unstable_rethrow(error);
    console.error(`getInitialUserPageData => `, error);

    return errorResponse({
      message:"Something went wrong please try again later"
    })
  }
};

export default getInitialUserPageData;