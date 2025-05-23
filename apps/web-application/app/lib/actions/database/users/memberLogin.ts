'use server';
import { connectToDatabase, userSchema } from '@repo/db';
import bcrypt from 'bcryptjs';
import { IMemberLogin, User } from '@repo/typescript-types';
import {  errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { memberLoginDefaultRequireFields } from '@repo/data-structures';
import { createNewSession } from '@lib/session';

const memberLogin = async (
  {
    username,
    password,
  }: IMemberLogin): Promise<ServerActionResponse> => {

  try {
    await connectToDatabase('memberLogin');

    if (!username || !password) {
      return errorResponse({ message: 'Missing Username or Password'});
    }



    let user = await userSchema
      .findOne({ username: { $regex: new RegExp(`^${username}$`, 'i') } })
      .select([...memberLoginDefaultRequireFields, 'password'])
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      }).lean<User>() as any;

    if (!user) {
      return errorResponse({ message: 'User was not found' });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return errorResponse({ message: 'Wrong Username or Password' });
    }

    delete user.password;

    const userData = JSON.parse(JSON.stringify(user))

    if (userData?._id){
      await createNewSession(userData._id,userData.role)
    }

    return successResponse({
        data: {
          userData
        },
      },
    );
    // return successResponse({});

  } catch (error) {
    console.log(`error=> `,error)
    return errorResponse({
      message: 'Something went wrong please try again later',
      error,
    });
  }
};

export default memberLogin;