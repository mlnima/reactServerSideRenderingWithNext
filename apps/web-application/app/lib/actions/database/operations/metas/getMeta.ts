'use server';
import { connectToDatabase, metaSchema,isValidObjectId } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getMeta = async(_id:string):Promise<ServerActionResponse<{meta:IMeta} | null>> =>{
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

    meta._id = meta._id.toString()


    return successResponse({
      data: {
        meta
      },
    });

  }catch (error){
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
}

export default getMeta