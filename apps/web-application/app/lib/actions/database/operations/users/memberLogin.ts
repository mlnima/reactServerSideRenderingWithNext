'use server';
import { connectToDatabase, userSchema } from '@repo/db';
import bcrypt from 'bcryptjs';
import { IMemberLogin } from '@repo/typescript-types';
import {  errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { memberLoginDefaultRequireFields } from '@repo/data-structures';
import { createNewSession } from '@lib/session';

const memberLogin = async (
  {
    username,
    password,
  }: IMemberLogin): Promise<ServerActionResponse> => {

  try {
    await connectToDatabase('login');

    if (!username || !password) {
      return errorResponse({ message: 'Wrong Username or Password'});
    }

    let user = await userSchema
      .findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })
      .select([...memberLoginDefaultRequireFields, 'password'])
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      }).lean() as any;

    if (!user) {
      return errorResponse({ message: 'Wrong Username or Password' });
    }

    if (user?._id) {
      user._id = user._id.toString();
    }
    if (user?.profileImage?._id) {
      user.profileImage._id = user.profileImage._id.toString();
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return errorResponse({ message: 'Wrong Username or Password' });
    }

    delete user.password;

    if (user?._id){
      await createNewSession(user._id,user.role)
    }

    return successResponse({
        data: {
          userData: user
        },
      },
    );

  } catch (error) {
    return errorResponse({
      message: 'Something went wrong please try again later',
      error,
    });
  }
};

export default memberLogin;