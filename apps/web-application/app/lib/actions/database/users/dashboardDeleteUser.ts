//dashboardDeleteUser
'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { connectToDatabase, userSchema } from '@repo/db';

interface IDashboardGetUser {
  _id: string;
}

const dashboardDeleteUser = async ({ _id }: IDashboardGetUser) => {
  let connection;

  try {
    const { isAdmin,userId } = await verifySession();

    if (!isAdmin || _id === userId) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('dashboardGetUser');
    const session = await connection.startSession();

    try {
      await userSchema.findByIdAndDelete(_id).session(session);
      return successResponse({});

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.log(`dashboardDeleteUser Error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardDeleteUser;



// //dashboardDeleteUser
// 'use server';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { verifySession } from '@lib/dal';
// import { connectToDatabase, userSchema } from '@repo/db';
//
// interface IDashboardGetUser {
//   _id: string;
// }
//
// const dashboardDeleteUser = async ({ _id }: IDashboardGetUser) => {
//   try {
//     const { isAdmin,userId } = await verifySession();
//
//     if (!isAdmin || _id === userId) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
//     await connectToDatabase('dashboardGetUser');
//
//     await userSchema.findByIdAndDelete(_id)
//
//     return successResponse({});
//   } catch (error) {
//     console.log(`dashboardDeleteUser Error=> `, error);
//
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardDeleteUser;