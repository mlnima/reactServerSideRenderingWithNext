'use server';

import { settingSchema, connectToDatabase } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';

const dashboardUpdateSettings = async (
  { type, data }: { type: string, data: any },
) => {
  // 'use cache';
  try {

    await connectToDatabase('dashboardUpdateSettings');

    await settingSchema.findOneAndUpdate({ type }, { $set: { data } });

    return successResponse({
      message: 'updated',
    });
  } catch (error) {
    console.error(`getSettings => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdateSettings;