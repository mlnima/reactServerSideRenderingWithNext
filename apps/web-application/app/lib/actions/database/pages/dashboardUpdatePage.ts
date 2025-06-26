'use server';
import { pageSchema, connectToDatabase } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { IPage } from '@repo/typescript-types';

interface IDashboardUpdatePage {
  pageData: IPage;
}

const dashboardUpdatePage = async ({ pageData }: IDashboardUpdatePage) => {
  if (!pageData) {
    return errorResponse({
      message: 'Page data is missing',
    });
  }

  let connection;

  try {
    connection = await connectToDatabase('dashboardUpdatePage');
    const session = await connection.startSession();

    try {
      await pageSchema.findByIdAndUpdate(pageData?._id, { $set: { ...pageData } }, { upsert: true }).session(session);

      return successResponse({
        data: {
          updatedPage: JSON.parse(JSON.stringify(pageData)),
        },
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`dashboardUpdatePage => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdatePage;

// 'use server';
// import { pageSchema, connectToDatabase } from '@repo/db';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { IPage } from '@repo/typescript-types';
//
// interface IDashboardUpdatePage {
//   pageData: IPage;
// }
//
// const dashboardUpdatePage = async ({ pageData }: IDashboardUpdatePage) => {
//
//   try {
//     if (!pageData) {
//       return errorResponse({
//         message: 'Page data is missing',
//       });
//     }
//     await connectToDatabase('dashboardUpdatePage');
//     let updatedPage = await pageSchema.findByIdAndUpdate(pageData?._id, { $set: { ...pageData } }, { upsert: true }).lean<IPage>();
//
//     if (!updatedPage) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     return successResponse({
//       data: {
//         updatedPage: JSON.parse(JSON.stringify(pageData)),
//       },
//     });
//
//   } catch (error) {
//     console.error(`getPage => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default dashboardUpdatePage;