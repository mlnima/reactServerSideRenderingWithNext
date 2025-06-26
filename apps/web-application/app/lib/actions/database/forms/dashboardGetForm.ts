'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';
import { IForm } from '@repo/typescript-types';

const dashboardGetForm = async (
  {
    _id,
  }: { _id: string },
): Promise<ServerActionResponse<{ form: IForm } | null>> => {

  let connection;

  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('dashboardGetForm');
    const session = await connection.startSession();

    try {
      let form = await formSchema.findById(_id).session(session).lean<IForm>();

      if (!form) {
        return errorResponse({
          message: 'Form was not found',
        });
      }

      const serializedData = {
        form: JSON.parse(JSON.stringify(form)),
      };

      // Clean up reference
      form = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {

    console.log(`dashboardGetForm Error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};

export default dashboardGetForm;


// 'use server';
// import { verifySession } from '@lib/dal';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { connectToDatabase, formSchema } from '@repo/db';
//
//
// const dashboardGetForm = async (
//   {
//     _id,
//   }: { _id: string },
// ) => {
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
//     const form = await formSchema.findById(_id).lean();
//     if (!form) {
//       if (!isAdmin) {
//         return errorResponse({
//           message: 'Form was not found',
//         });
//       }
//     }
//
//     return successResponse({
//       data: {
//         form: JSON.parse(JSON.stringify(form)),
//       },
//     });
//
//   } catch (error) {
//
//     console.log(`dashboardGetForm Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGetForm;