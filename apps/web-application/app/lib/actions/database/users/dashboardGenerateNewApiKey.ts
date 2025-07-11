'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { connectToDatabase, userSchema } from '@repo/db';
import uuidAPIKey from 'uuid-apikey';

const dashboardGenerateNewApiKey = async () => {
  try {
    const { isAdmin, userId } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    await connectToDatabase('dashboardGenerateNewApiKey');

    const newAPIKey = uuidAPIKey.create();

    const APIkeys = {
      API_KEY: newAPIKey.apiKey,
      uuid: newAPIKey.uuid,
    };

    await userSchema.findByIdAndUpdate(userId, { $set: APIkeys }).exec();

    return successResponse({
      data: {
        ...APIkeys,
      },
    });
  } catch (error) {
    console.log(`dashboardGenerateNewApiKey Error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGenerateNewApiKey;
