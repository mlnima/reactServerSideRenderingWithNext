'use server';
import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const dashboardDeleteMeta = async (_id: string): Promise<ServerActionResponse<{ meta: IMeta } | null>> => {
  try {
    await connectToDatabase('getMeta');
    const isId = isValidObjectId(_id);
    if (!isId) {
      return errorResponse({
        message: 'Not Found',
      });
    }
    await metaSchema.findByIdAndDelete(_id).lean<IMeta>();

    return successResponse({
      message: 'meta deleted',
    });

  } catch (error) {
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardDeleteMeta;