'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IWidget } from '@repo/typescript-types';

const dashboardCreateNewWidget = async (data: {}): Promise<ServerActionResponse<{ newWidget: IWidget } | null>> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('dashboardCreateNewWidget');

    let dataToSave = new widgetSchema({ data });
    const savedWidget = await dataToSave.save();

    return successResponse({
      data: {
        newWidget: JSON.parse(JSON.stringify(savedWidget)),
      },
    });
  } catch (error) {
    console.error(`dashboardCreateNewWidget => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardCreateNewWidget;
