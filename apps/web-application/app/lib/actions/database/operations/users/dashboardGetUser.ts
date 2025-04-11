'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';

interface IDashboardGetUser {
  _id: string;
}

const dashboardGetUser = async ({ _id }: IDashboardGetUser) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetUser');

    let user = await userSchema
      .findById(_id)
      .select([ '-password'])
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      }).lean<User>() ;

    return successResponse({
      data: {
        user: JSON.parse(JSON.stringify(user)),

      },
    });

  } catch (error) {
    console.log(`error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetUser;