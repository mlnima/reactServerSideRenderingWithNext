'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IWidget } from '@repo/typescript-types';

const dashboardGetWidgets = async (): Promise<ServerActionResponse<{ widgets: IWidget[] }>> => {
  let connection;

  try {
    connection = await connectToDatabase('dashboardGetWidgets');
    const session = await connection.startSession();

    try {
      const widgets = await widgetSchema.find({}).session(session).lean<IWidget[]>();

      return successResponse({
        data: {
          widgets: JSON.parse(JSON.stringify(widgets)),
        },
      });

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`dashboardGetWidgets => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetWidgets;

// 'use server';
// import { connectToDatabase, widgetSchema } from '@repo/db';
// import { errorResponse, successResponse } from '@lib/actions/response';
//
// const dashboardGetWidgets = async () => {
//
//   try {
//     await connectToDatabase('dashboardGetWidgets');
//     const widgets = await widgetSchema.find({}).lean();
//     return successResponse({
//       data: {
//         widgets: JSON.parse(JSON.stringify(widgets)),
//       },
//     });
//   } catch (error) {
//     console.error(`getPost => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
//
// };
//
// export default dashboardGetWidgets;