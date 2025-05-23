'use server';
import { connectToDatabase, userSchema } from '@repo/db';
import { memberLoginDefaultRequireFields } from '@repo/data-structures';
import {
  errorResponse,
  successResponse,
  ServerActionResponse,
} from '@lib/actions/response';
import { cookies } from 'next/headers'
import { decryptJWT } from '@lib/session';
import { User } from '@repo/typescript-types';



const memberAutoLogin = async (): Promise<ServerActionResponse> => {
  try {
    const cookieStore = await cookies();
    if (!cookieStore.has('session')) return errorResponse({ message: 'No session was provided', });

    const session = cookieStore.get('session')?.value
    if (!session) {
      return errorResponse({ message: 'Unauthorized Access' });
    }
    const payload = await decryptJWT(session)
    
    if (!payload) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    await connectToDatabase('autoLogin');

    let user = (await userSchema
      .findById(payload._id)
      .select(memberLoginDefaultRequireFields)
      .populate({
        path: 'profileImage',
        select: 'filePath',
        model: 'file',
        options: { strictPopulate: false },
      })
      .lean<User>()) as any;


    if (!user) return errorResponse({ message: 'Wrong Username or Password', });

    return successResponse({
        data: {
          userData: JSON.parse(JSON.stringify(user))
        }
      },
    );


  } catch (error) {
    return errorResponse({ message: 'Server Error', error });

  }
};

export default memberAutoLogin;
