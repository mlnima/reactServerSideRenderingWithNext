'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';

const dashboardCreateNewWidget = async (data: {}) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    await connectToDatabase('getWidgets');
    let dataToSave = new widgetSchema({ data });
    const savedWidget = await dataToSave?.save();

    return successResponse({
      data: {
        newWidget: JSON.parse(JSON.stringify(savedWidget)),
      },
    });

  } catch (error) {
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardCreateNewWidget;