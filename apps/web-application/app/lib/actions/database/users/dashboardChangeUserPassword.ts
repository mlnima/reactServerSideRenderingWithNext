'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { connectToDatabase, userSchema } from '@repo/db';
import { User } from '@repo/typescript-types';
import bcrypt from 'bcryptjs';

interface IDashboardGetUser {
  _id: string;
  oldPass: string,
  newPass: string
  newPass2: string
}

const dashboardChangeUserPassword = async ({ _id, oldPass, newPass, newPass2 }: IDashboardGetUser) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetUser');

    const user = await userSchema.findById(_id).lean<User>();


    if (!user || !user?.password) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    const passwordMatch = await bcrypt.compare(oldPass, user.password);

    if (!passwordMatch) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    if (newPass !== newPass2) {
      return errorResponse({
        message: 'Mismatch Password',
      });
    }

    const hash = bcrypt.hashSync(newPass, 10);

    await userSchema.findByIdAndUpdate(user._id, { $set: { password: hash } });

    return successResponse({
      message: 'Password has been changed',
    });
  } catch (error) {
    console.log(`dashboardChangeUserPassword Error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardChangeUserPassword;
