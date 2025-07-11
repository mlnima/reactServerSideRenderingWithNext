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

    await connectToDatabase('dashboardRemoveWidget');

    const result = await widgetSchema.findByIdAndDelete(_id).exec();

    if (!result) {
      return errorResponse({
        message: 'Widget not found.',
      });
    }

    return successResponse({
      data: null,
      message: 'Widget deleted successfully',
    });
  } catch (error) {
    console.error(`dashboardRemoveWidget => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardRemoveWidget;
