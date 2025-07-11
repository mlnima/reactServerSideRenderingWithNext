'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';

const dashboardDeleteForm = async ({ _id, }: { _id: string }): Promise<ServerActionResponse> => {



  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardDeleteForm');

    const deletedForm = await formSchema.findByIdAndDelete(_id ).exec();

    if (!deletedForm) {
      return errorResponse({ message: 'Form not found.' });
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