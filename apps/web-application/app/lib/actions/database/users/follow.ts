'use server';
import { connectToDatabase, userRelationSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const follow = async ({ followId }: { followId: string }) => {
  let connection;

  try {
    const { isAuth, userId } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    connection = await connectToDatabase('follow');
    const session = await connection.startSession();

    try {
      const alreadyFollowing = await userRelationSchema.exists({
        userId,
        following: { $elemMatch: { $eq: followId } },
      }).session(session);

      if (alreadyFollowing) {
        return errorResponse({
          message: 'Already Following',
        });
      }

      await userRelationSchema.findOneAndUpdate({ userId: userId }, { $addToSet: { following: followId } }, { session });
      await userRelationSchema.findOneAndUpdate({ userId: followId }, { $inc: { followersCount: 1 } }, { session });

      return successResponse({
        message: 'Success',
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`follow => `, error);
    return errorResponse({});
  }
};

export default follow;

// 'use server';
// import { connectToDatabase,userRelationSchema } from '@repo/db';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { verifySession } from '@lib/dal';
//
// const follow = async ({ followId }: { followId: string }) => {
//   try {
//     const { isAuth, userId } = await verifySession();
//
//     if (!isAuth) {
//       return errorResponse({
//         message: 'You Need To Log In',
//       });
//     }
//     await connectToDatabase('follow');
//
//
//     const alreadyFollowing = await userRelationSchema.exists({
//       userId,
//       following: { $elemMatch: { $eq: followId } },
//     });
//
//     if (alreadyFollowing) {
//       return errorResponse({
//         message: 'Already Following',
//       });
//     }
//
//     await userRelationSchema.findOneAndUpdate({userId:userId}, { $addToSet: { following: followId } });
//     await userRelationSchema.findOneAndUpdate({userId:followId}, { $inc: { followersCount: 1 } });
//     return successResponse({
//       message: 'Success',
//     });
//   } catch (error) {
//     console.error(`sendFollowRequest => `, error);
//     return errorResponse({});
//   }
// };
//
// export default follow;