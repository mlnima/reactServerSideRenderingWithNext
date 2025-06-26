'use server';
import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const dashboardDeleteMeta = async (_id: string): Promise<ServerActionResponse> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    const isId = isValidObjectId(_id);
    if (!isId) {
      return errorResponse({
        message: 'Invalid ID format provided.',
      });
    }

    connection = await connectToDatabase('dashboardDeleteMeta');
    const session = await connection.startSession();

    try {
      const deletedMeta = await metaSchema.findByIdAndDelete(_id, { session });

      if (!deletedMeta) {
        return errorResponse({ message: 'Meta not found.' });
      }

    } finally {
      await session.endSession();
    }

    return successResponse({
      message: 'Meta deleted',
    });

  } catch (error) {
    console.error('dashboardDeleteMeta Error =>', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardDeleteMeta;




// 'use server';
// import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
// import { IMeta } from '@repo/typescript-types';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// const dashboardDeleteMeta = async (_id: string): Promise<ServerActionResponse<{ meta: IMeta } | null>> => {
//   try {
//     await connectToDatabase('getMeta');
//     const isId = isValidObjectId(_id);
//     if (!isId) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//     await metaSchema.findByIdAndDelete(_id).lean<IMeta>();
//
//     return successResponse({
//       message: 'meta deleted',
//     });
//
//   } catch (error) {
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default dashboardDeleteMeta;