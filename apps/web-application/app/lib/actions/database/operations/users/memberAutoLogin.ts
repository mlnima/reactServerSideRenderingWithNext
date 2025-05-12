'use server';
import { connectToDatabase, userSchema } from '@repo/db';
// import { jwtValidator } from '@repo/utils-server';
// import { JWTPayload } from '@repo/typescript-types';
import { memberLoginDefaultRequireFields } from '@repo/data-structures';
import {
  errorResponse,
  successResponse,
  ServerActionResponse,
} from '@lib/actions/response';
import { cookies } from 'next/headers'
import { decryptJWT } from '@lib/session';



const memberAutoLogin = async (): Promise<ServerActionResponse> => {
  try {

    const session = (await cookies()).get('session')?.value
    const payload = await decryptJWT(session)

    if (!session || !payload) {
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
      .lean()) as any;

    if (user?._id) {
      user._id = user._id.toString();
    }
    if (user?.profileImage?._id) {
      user.profileImage._id = user.profileImage._id.toString();
    }


    if (!user) return errorResponse({ message: 'Wrong Username or Password', });

    return successResponse({
        data: {
          userData:{
            ...user,
            _id: user._id.toString(),
            profileImage: user.profileImage
              ? { ...user.profileImage, _id: user.profileImage._id?.toString() }
              : null,
          }
        }
      },
    );


  } catch (error) {
    return errorResponse({ message: 'Server Error', error });

  }
};

export default memberAutoLogin;
