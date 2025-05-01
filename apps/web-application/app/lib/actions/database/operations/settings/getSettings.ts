'use server';
import {
  settingSchema,
  connectToDatabase,
} from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { Document } from 'mongoose';

interface SettingSetting extends Document {
  type: string;
  [key: string]: any;
}

const getSettings = async (
  requireSettings: string[],
) => {
  'use cache';
  try {
    await connectToDatabase('getSettings');
    const settings = await settingSchema
      .find({
        type: { $in: requireSettings },
      }).select(['-createdAt','-updatedAt'])
      .lean<SettingSetting[]>();

    const objectifySettings = settings.reduce<Record<string, SettingSetting>>((acc, setting) => {
      acc[setting.type] = setting?.data || {};
      return acc;
    }, {});

    // cacheTag('cacheItem', 'CSetting', `CSettings-${requireSettings.join('-')}`);
    return successResponse({
      data: JSON.parse(JSON.stringify(objectifySettings)),
    });
  } catch (error) {
    console.error(`getSettings => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getSettings;


