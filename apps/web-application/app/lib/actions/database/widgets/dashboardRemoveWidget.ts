'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const dashboardRemoveWidget = async (_id: string): Promise<ServerActionResponse<null>> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    let connection;
    connection = await connectToDatabase('dashboardRemoveWidget');
    const session = await connection.startSession();

    try {
      const result = await widgetSchema.findByIdAndDelete(_id, { session });

      if (!result) {
        return errorResponse({
          message: 'Widget not found.',
        });
      }

      return successResponse({
        data: null,
        message: 'Widget deleted successfully'
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`dashboardRemoveWidget => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardRemoveWidget;


// 'use server';
// import { connectToDatabase, widgetSchema } from '@repo/db';
// import { verifySession } from '@lib/dal';
// import { errorResponse, successResponse } from '@lib/actions/response';
//
// const dashboardRemoveWidget = async (_id:string) => {
//   try {
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//     await connectToDatabase('dashboardRemoveWidget');
//
//     await widgetSchema.findByIdAndDelete(_id)
//
//     return successResponse({
//       message:'deleted'
//     });
//
//   } catch (error) {
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default dashboardRemoveWidget;