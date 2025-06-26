'use server';
import { connectToDatabase, metaSchema } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const dashboardUpdateMeta = async ({ updatingData }: { updatingData: IMeta }): Promise<ServerActionResponse<{ meta: IMeta } | null>> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    if (!updatingData || !updatingData._id) {
      return errorResponse({
        message: 'No Data or ID Provided',
      });
    }

    connection = await connectToDatabase('dashboardUpdateMeta');
    const session = await connection.startSession();

    try {
      // Use { new: true } to get the updated document back. Pass the session.
      let updatedMeta = await metaSchema.findByIdAndUpdate(
        updatingData._id,
        updatingData,
        { new: true, session }
      );

      if (!updatedMeta) {
        return errorResponse({ message: 'Meta not found for update.' });
      }

      const serializedData = {
        meta: JSON.parse(JSON.stringify(updatedMeta)),
      };

      // Clean up reference
      updatedMeta = null;

      return successResponse({
        data: serializedData,
        message: 'Updated',
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error('dashboardUpdateMeta Error =>', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdateMeta;

// 'use server';
// import { connectToDatabase, metaSchema } from '@repo/db';
// import { IMeta } from '@repo/typescript-types';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
//
// const dashboardUpdateMeta = async(updatingData:IMeta):Promise<ServerActionResponse<{meta:IMeta} | null>> =>{
//   try {
//     await connectToDatabase('dashboardUpdateMeta');
//
//     if (!updatingData){
//       return errorResponse({
//         message: 'No Data Provided',
//       });
//     }
//     await metaSchema.findByIdAndUpdate(updatingData._id,updatingData).lean<IMeta>()
//
//     return successResponse({
//       message: 'Updated',
//     });
//
//   }catch (error){
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// }
//
// export default dashboardUpdateMeta