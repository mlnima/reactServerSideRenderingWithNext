'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IWidget } from '@repo/typescript-types';

const dashboardGetWidgets = async (): Promise<ServerActionResponse<{ widgets: IWidget[] }>> => {
  try {
    await connectToDatabase('dashboardGetWidgets');

    const widgets = await widgetSchema.find({}).lean<IWidget[]>().exec();

    return successResponse({
      data: {
        widgets: JSON.parse(JSON.stringify(widgets)),
      },
    });
  } catch (error) {
    console.error(`dashboardGetWidgets => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetWidgets;
