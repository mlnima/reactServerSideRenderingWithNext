'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IWidget } from '@repo/typescript-types';

const dashboardUpdateWidget = async (updateData: {
  _id: string;
  data: {};
}): Promise<
  ServerActionResponse<{
    updatedWidget: IWidget;
  } | null>
> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    const { data, _id } = updateData;

    if (!data || !_id) {
      return errorResponse({
        message: 'Missing Data',
      });
    }

    await connectToDatabase('dashboardUpdateWidget');

    const updatedWidget = await widgetSchema.findByIdAndUpdate(_id, { data }, { new: true }).lean<IWidget>().exec();

    if (!updatedWidget) {
      return errorResponse({
        message: 'Widget not found or could not be updated.',
      });
    }

    return successResponse({
      data: {
        updatedWidget: JSON.parse(JSON.stringify(updatedWidget)),
      },
    });
  } catch (error) {
    console.error(`dashboardUpdateWidget => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdateWidget;
