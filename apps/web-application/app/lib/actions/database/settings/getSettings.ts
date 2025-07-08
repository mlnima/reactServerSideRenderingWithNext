
'use server';
import {
  settingSchema,
  connectToDatabase,
} from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { Document } from 'mongoose';
import { unstable_cacheTag as cacheTag } from 'next/cache';

interface SettingSetting extends Document {
  type: string;
  [key: string]: any;
}

const getSettings = async (
  requireSettings: string[],
) => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getSettings');

    const session = await connection.startSession();

    try {
      let settings = await settingSchema
        .find({
          type: { $in: requireSettings },
        })
        .select(['-createdAt', '-updatedAt'])
        .session(session)
        .lean<SettingSetting[]>();

      // Process settings data
      const objectifySettings = settings.reduce<Record<string, SettingSetting>>((acc, setting) => {
        acc[setting.type] = setting?.data || {};
        return acc;
      }, {});

      // Serialize data efficiently
      const serializedData = JSON.parse(JSON.stringify(objectifySettings));

      settings = null;

      const cachedTags = requireSettings.map((requireSetting) => `CSetting-${requireSetting}`);
      cacheTag('cacheItem', 'CSettings',...cachedTags);

      return successResponse({
        data: serializedData
      });

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getSettings => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getSettings;




// 'use server';
// import {
//   settingSchema,
//   connectToDatabase,
// } from '@repo/db';
// import { errorResponse, successResponse } from '@lib/actions/response';
// import { Document } from 'mongoose';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
//
//
// interface SettingSetting extends Document {
//   type: string;
//   [key: string]: any;
// }
//
// const getSettings = async (
//   requireSettings: string[],
// ) => {
//   'use cache';
//   try {
//     await connectToDatabase('getSettings');
//     const settings = await settingSchema
//       .find({
//         type: { $in: requireSettings },
//       }).select(['-createdAt','-updatedAt'])
//       .lean<SettingSetting[]>();
//
//     const objectifySettings = settings.reduce<Record<string, SettingSetting>>((acc, setting) => {
//       acc[setting.type] = setting?.data || {};
//       return acc;
//     }, {});
//
//     const data =  JSON.parse(JSON.stringify(objectifySettings))
//     cacheTag('cacheItem', 'CSettings', `CSettings-${requireSettings.join('-')}`);
//     return successResponse({
//       data
//     });
//   } catch (error) {
//     console.error(`getSettings => `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default getSettings;
//
//
