'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';

interface IDashboardGetUser {
  update: User | null;
}

const dashboardUpdateUser = async ({ update }: IDashboardGetUser) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    if (!update || !update._id) {
      return errorResponse({
        message: 'User update Data or ID mission',
      });
    }


    await connectToDatabase('dashboardGetUser');

    await userSchema.findByIdAndUpdate(update._id, update);

    return successResponse({
      message: 'User Updated',
    });

  } catch (error) {
    console.log(`error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardUpdateUser;