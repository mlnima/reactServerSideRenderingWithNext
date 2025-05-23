'use server';
import { connectToDatabase, metaSchema } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const dashboardUpdateMeta = async(updatingData:IMeta):Promise<ServerActionResponse<{meta:IMeta} | null>> =>{
  try {
    await connectToDatabase('dashboardUpdateMeta');

    if (!updatingData){
      return errorResponse({
        message: 'No Data Provided',
      });
    }
    await metaSchema.findByIdAndUpdate(updatingData._id,updatingData).lean<IMeta>()

    return successResponse({
      message: 'Updated',
    });

  }catch (error){
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
}

export default dashboardUpdateMeta