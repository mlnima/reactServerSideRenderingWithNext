'use server';
import { Types } from 'mongoose';
import { connectToDatabase, userRelationSchema } from '@repo/db';
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
  "use cache";

  let connection;

  try {
    connection = await connectToDatabase('getLoadedUserPageData');
    const session = await connection.startSession();

    try {
      let [targetUser, requestingUser] = await Promise.all([
        userRelationSchema.findOne(
          { userId: userId },
          {
            _id: 1,
            blockList: { $elemMatch: { $eq: userWhoRequestIt } },
            following: { $elemMatch: { $eq: userWhoRequestIt } },
          },
        ).session(session).lean(),
        userRelationSchema.findOne(
          { userId: userWhoRequestIt },
          {
            _id: 1,
            blockList: { $elemMatch: { $eq: userId } },
            following: { $elemMatch: { $eq: userId } },
          },
        ).session(session).lean(),
      ]);

      const loadedUserPageData = {
        isBlockedByTargetUser: !!targetUser?.blockList?.length,
        isFollowedByTargetUser: !!targetUser?.following?.length,
        isBlocked: !!requestingUser?.blockList?.length,
        isFollowed: !!requestingUser?.following?.length,
      };

      targetUser = null;
      requestingUser = null;

      cacheTag('cacheItem', `CUserPageLoaded-${userId}-${userWhoRequestIt}`);

      return successResponse({
        data: {
          loadedUserPageData,
        },
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getLoadedUserPageData => `, error);

    return errorResponse({
      message: "Something went wrong please try again later",
    });
  }
};


export default getLoadedUserPageData;












// 'use server';
// import { Types } from 'mongoose';
// import { connectToDatabase, userRelationSchema } from '@repo/db';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { IUserRelation } from '@repo/typescript-types';
//
// interface IGetLoadedUserPageData {
//   userId: string | Types.ObjectId,
//   userWhoRequestIt: string | Types.ObjectId,
// }
//
//  const getLoadedUserPageData = async (
//   {
//     userId,
//     userWhoRequestIt,
//   }: IGetLoadedUserPageData) => {
//   "use cache"
//   try {
//     await connectToDatabase('getLoadedUserPageData');
//
//     const userRelationData = await userRelationSchema
//       .findOne({ userId })
//       .lean<IUserRelation>()
//
//     const [targetUser, requestingUser] = await Promise.all([
//       userRelationSchema.findOne(
//         { userId: userId },
//         {
//           _id: 1,
//           blockList: { $elemMatch: { $eq: userWhoRequestIt } },
//           following: { $elemMatch: { $eq: userWhoRequestIt } },
//         },
//       ),
//       userRelationSchema.findOne(
//         { userId: userWhoRequestIt },
//         {
//           _id: 1,
//           blockList: { $elemMatch: { $eq: userId } },
//           following: { $elemMatch: { $eq: userId } },
//         },
//       ),
//     ]);
//
//     const loadedUserPageData = {
//       isBlockedByTargetUser: !!targetUser?.blockList?.length,
//       isFollowedByTargetUser: !!targetUser?.following?.length,
//       isBlocked: !!requestingUser?.blockList?.length,
//       isFollowed: !!requestingUser?.following?.length,
//     };
//
//     cacheTag('cacheItem', `CUserPageLoaded-${userId}-${userWhoRequestIt}`);
//
//     return successResponse({ data:{
//        loadedUserPageData
//       }})
//
//   } catch (error) {
//     console.error(`getLoadedUserPageData => `, error);
//
//     return errorResponse({
//       message:"Something went wrong please try again later"
//     })
//   }
// };
//
//
// export default getLoadedUserPageData;