
'use server';
import { pageSchema, connectToDatabase } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { IPage } from '@repo/typescript-types';

const dashboardGetPage = async ({ _id }: { _id: string }) => {
  if (!_id) {
    return errorResponse({
      message: 'Not Found',
    });
  }

  let connection;

  try {
    connection = await connectToDatabase('getPage');
    const session = await connection.startSession();

    try {
      let pageData = await pageSchema.findById(_id).session(session).lean<IPage>();

      if (!pageData) {
        return errorResponse({
          message: 'Not Found',
        });
      }

      const serializedData = {
        pageData: JSON.parse(JSON.stringify(pageData)),
      };

      pageData = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`getPage => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetPage;



// 'use server';
// import { pageSchema, connectToDatabase } from '@repo/db';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { IPage } from '@repo/typescript-types';
//
// const dashboardGetPage = async ({ _id }: { _id: string }) => {
//
//   try {
//     if (!_id) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//     await connectToDatabase('getPage');
//     let pageData = await pageSchema.findById({ _id }).lean<IPage>();
//
//     if (!pageData) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     return successResponse({
//       data: {
//         pageData:JSON.parse(JSON.stringify(pageData)),
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
// export default dashboardGetPage;