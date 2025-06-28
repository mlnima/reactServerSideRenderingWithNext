'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { connectToDatabase, userSchema } from '@repo/db';
import uuidAPIKey from 'uuid-apikey';

const dashboardGenerateNewApiKey = async () => {
  let connection;

  try {
    const { isAdmin, userId } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    connection = await connectToDatabase('dashboardGenerateNewApiKey');
    const session = await connection.startSession();

    try {
      const newAPIKey = uuidAPIKey.create();

      const APIkeys = {
        API_KEY: newAPIKey.apiKey,
        uuid: newAPIKey.uuid,
      };

      await userSchema.findByIdAndUpdate(userId, { $set: APIkeys }).session(session);

      return successResponse({
        data: {
          ...APIkeys,
        },
      });
    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.log(`dashboardGenerateNewApiKey Error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGenerateNewApiKey;


// 'use server';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { verifySession } from '@lib/dal';
// import { connectToDatabase, userSchema } from '@repo/db';
// import uuidAPIKey from 'uuid-apikey';
//
// const dashboardGenerateNewApiKey = async () => {
//   try {
//     const { isAdmin, userId } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//     await connectToDatabase('dashboardGenerateNewApiKey');
//
//
//     const newAPIKey = uuidAPIKey.create();
//
//     const APIkeys = {
//       API_KEY: newAPIKey.apiKey,
//       uuid: newAPIKey.uuid,
//     };
//
//     userSchema.findByIdAndUpdate(userId, { $set: APIkeys });
//
//     return successResponse({
//       data: {
//         ...APIkeys,
//       },
//     });
//
//   } catch (error) {
//     console.log(`dashboardGenerateNewApiKey Error=> `, error);
//
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardGenerateNewApiKey;