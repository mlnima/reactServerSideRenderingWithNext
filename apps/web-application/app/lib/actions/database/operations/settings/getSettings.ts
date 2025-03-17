'use server';
import { Document } from 'mongoose';
import {
  settingSchema,
  connectToDatabase,
} from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, successResponse } from '@lib/actions/response';

interface Setting extends Document {
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
      })
      .lean<Setting[]>({
        virtuals: true,
        transform: (doc: Document) => {
          if (doc?._id) {
            doc._id = doc._id.toString();
          }
          return doc;
        },
      });
    cacheTag('cacheItem', 'CSetting', `CSettings-${requireSettings.join('-')}`);
    // return settings.reduce<Record<string, Setting>>((acc, setting) => {
    //   acc[setting.type] = setting?.data || {};
    //   return acc;
    // }, {});

    return successResponse({
      data: settings.reduce<Record<string, Setting>>((acc, setting) => {
        acc[setting.type] = setting?.data || {};
        return acc;
      }, {})
    });
  } catch (error) {
    console.error(`getSettings => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getSettings;