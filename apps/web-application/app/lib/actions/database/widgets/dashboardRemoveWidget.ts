'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';

const dashboardRemoveWidget = async (_id:string) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    await connectToDatabase('dashboardRemoveWidget');

    await widgetSchema.findByIdAndDelete(_id)

    return successResponse({
      message:'deleted'
    });

  } catch (error) {
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardRemoveWidget;