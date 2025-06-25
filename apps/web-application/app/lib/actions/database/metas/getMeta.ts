'use server';
import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { unstable_cacheTag as cacheTag } from 'next/cache';

const getMeta = async (_id: string): Promise<ServerActionResponse<{ meta: IMeta } | null>> => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getMeta');

    const isId = isValidObjectId(_id);
    if (!isId) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    // Create session for better resource management
    const session = await connection.startSession();

    try {
      // Execute query with session
      let meta = await metaSchema
        .findById(_id)
        .session(session)
        .lean<IMeta>();

      if (!meta || meta.status !== 'published') {
        return errorResponse({
          message: 'Not Found',
        });
      }

      // Serialize data efficiently
      const serializedMeta = JSON.parse(JSON.stringify(meta));

      // Clean up reference to prevent memory leaks
      meta = null;

      cacheTag('cacheItem', `CMeta-${_id}`);

      return successResponse({
        data: {
          meta: serializedMeta
        },
      });

    } finally {
      // Always end the session to free resources
      await session.endSession();
    }

  } catch (error) {
    console.error(`getMeta => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getMeta;






// 'use server';
// import { connectToDatabase, metaSchema,isValidObjectId } from '@repo/db';
// import { IMeta } from '@repo/typescript-types';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
//
// const getMeta = async(_id:string):Promise<ServerActionResponse<{meta:IMeta} | null>> =>{
//   'use cache';
//   try {
//
//     await connectToDatabase('getMeta');
//     const isId = isValidObjectId(_id);
//     if (!isId){
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//     let meta = await metaSchema.findById(_id).lean<IMeta>()
//
//     if (!meta || meta.status !== 'published'){
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     cacheTag(
//       'cacheItem',
//       `CMeta-${_id}`
//     );
//
//     return successResponse({
//       data: {
//         meta : JSON.parse(JSON.stringify(meta))
//       },
//     });
//
//   }catch (error){
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// }
//
// export default getMeta