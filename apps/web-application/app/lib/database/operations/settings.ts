'use cache';
import { Document, Types } from 'mongoose';
import { connectToDatabase, settingSchema } from '@repo/db';
import {
  unstable_cache,
  unstable_cacheTag as cacheTag,
  unstable_cacheLife as cacheLife,
} from 'next/cache';

interface Setting extends Document {
  type: string;

  [key: string]: any;
}

export const getSettings = async (
  requireSettings: string[]
): Promise<Record<string, Setting>> => {
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
    return settings.reduce<Record<string, Setting>>((acc, setting) => {
      acc[setting.type] = setting?.data || {};
      return acc;
    }, {});
  } catch (error) {
    console.error(`getSettings => `, error);
    return {};
  }
};
