'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, formSchema } from '@repo/db';

const dashboardDeleteForm = async ({ _id, }: { _id: string }) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardGetPosts');

    await formSchema.findByIdAndDelete(_id);

    return successResponse({
      message:'Deleted'
    });

  } catch (error) {

    console.log(`error=> `, error);
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardDeleteForm;