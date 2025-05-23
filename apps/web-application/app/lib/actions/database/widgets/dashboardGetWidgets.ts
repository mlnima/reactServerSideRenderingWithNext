'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';

const dashboardGetWidgets = async () => {

  try {
    await connectToDatabase('dashboardGetWidgets');
    const widgets = await widgetSchema.find({}).lean();
    return successResponse({
      data: {
        widgets: JSON.parse(JSON.stringify(widgets)),
      },
    });
  } catch (error) {
    console.error(`getPost => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }

};

export default dashboardGetWidgets;