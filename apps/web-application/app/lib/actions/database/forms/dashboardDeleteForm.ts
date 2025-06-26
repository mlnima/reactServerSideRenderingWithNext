'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';

const dashboardDeleteForm = async ({ _id, }: { _id: string }): Promise<ServerActionResponse> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('dashboardDeleteForm');
    const session = await connection.startSession();

    try {
      // Pass the session into the delete options
      const deletedForm = await formSchema.findByIdAndDelete(_id, { session });

      if (!deletedForm) {
        return errorResponse({ message: 'Form not found.' });
      }

    } finally {
      await session.endSession();
    }

    return successResponse({
      message:'Deleted'
    });

  } catch (error) {

    console.log(`dashboardDeleteForm Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardDeleteForm;


// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { connectToDatabase, formSchema } from '@repo/db';
//
// const dashboardDeleteForm = async ({ _id, }: { _id: string }) => {
//   try {
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//
//     await connectToDatabase('dashboardGetPosts');
//
//     await formSchema.findByIdAndDelete(_id);
//
//     return successResponse({
//       message:'Deleted'
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardDeleteForm Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardDeleteForm;