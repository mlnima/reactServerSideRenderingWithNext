//dashboardUpdateWidget
'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';

const dashboardUpdateWidget = async (updateData: {_id:string,data:{}}) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    await connectToDatabase('getWidgets');
    const {data,_id} = updateData;

    if (!data || !_id){
      return errorResponse({
        message: 'Missing Data',
      });
    }

    const updatedWidget = await widgetSchema.findByIdAndUpdate(_id,{data}, { new: true })

    return successResponse({
      data: {
        updatedWidget: JSON.parse(JSON.stringify(updatedWidget)),
      },
    });

  } catch (error) {
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdateWidget;