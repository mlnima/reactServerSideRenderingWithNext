'use server';
import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const dashboardGetMeta = async (_id: string): Promise<ServerActionResponse<{ meta: IMeta } | null>> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    if (!isValidObjectId(_id)) {
      return errorResponse({
        message: 'Invalid ID format provided.',
      });
    }

    connection = await connectToDatabase('dashboardGetMeta');
    const session = await connection.startSession();

    try {
      let meta = await metaSchema.findById(_id).session(session).lean<IMeta>();

      if (!meta) {
        return errorResponse({
          message: 'Not Found',
        });
      }

      const serializedData = {
        meta: JSON.parse(JSON.stringify(meta)),
      };

      // Clean up reference
      meta = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error('dashboardGetMeta Error =>', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetMeta;

// 'use server';
// import { connectToDatabase, metaSchema,isValidObjectId } from '@repo/db';
// import { IMeta } from '@repo/typescript-types';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// const dashboardGetMeta = async(_id:string):Promise<ServerActionResponse<{meta:IMeta} | null>> =>{
//   try {
//     await connectToDatabase('getMeta');
//     const isId = isValidObjectId(_id);
//     if (!isId){
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//     let meta = await metaSchema.findById(_id).lean<IMeta>()
//
//     if (!meta || !meta._id){
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     meta._id = meta._id.toString()
//
//
//     return successResponse({
//       data: {
//         meta
//       },
//     });
//
//   }catch (error){
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// }
//
// export default dashboardGetMeta