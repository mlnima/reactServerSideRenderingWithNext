'use server';
import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const dashboardGetMeta = async (_id: string): Promise<ServerActionResponse<{ meta: IMeta } | null>> => {


  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    if (!isValidObjectId(_id)) {
      return errorResponse({
        message: 'Invalid ID format provided.',
      });
    }

    await connectToDatabase('dashboardGetMeta');

    let meta = await metaSchema.findById(_id)
      .lean<IMeta>()
      .exec();
    if (!meta) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    const serializedData = {
      meta: JSON.parse(JSON.stringify(meta)),
    };

    // Clean up reference
    meta = null;

    return successResponse({
      data: serializedData,
    });

  } catch (error) {
    console.error('dashboardGetMeta Error =>', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetMeta;
