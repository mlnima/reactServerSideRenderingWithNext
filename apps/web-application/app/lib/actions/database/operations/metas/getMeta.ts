'use server';
import { connectToDatabase, metaSchema,isValidObjectId } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { unstable_cacheTag as cacheTag } from 'next/cache';

const getMeta = async(_id:string):Promise<ServerActionResponse<{meta:IMeta} | null>> =>{
  'use cache';
  try {

    await connectToDatabase('getMeta');
    const isId = isValidObjectId(_id);
    if (!isId){
      return errorResponse({
        message: 'Not Found',
      });
    }
    let meta = await metaSchema.findById(_id).lean<IMeta>()

    if (!meta || meta.status !== 'published'){
      return errorResponse({
        message: 'Not Found',
      });
    }

    cacheTag(
      'cacheItem',
      `CMeta-${_id}`
    );

    return successResponse({
      data: {
        meta : JSON.parse(JSON.stringify(meta))
      },
    });

  }catch (error){
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
}

export default getMeta