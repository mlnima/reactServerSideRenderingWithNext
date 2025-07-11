'use server';
import { connectToDatabase, metaSchema, isValidObjectId } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const dashboardDeleteMeta = async (_id: string): Promise<ServerActionResponse> => {


  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    const isId = isValidObjectId(_id);
    if (!isId) {
      return errorResponse({
        message: 'Invalid ID format provided.',
      });
    }

    await connectToDatabase('dashboardDeleteMeta');

    const deletedMeta = await metaSchema.findByIdAndDelete(_id ).exec();

    if (!deletedMeta) {
      return errorResponse({ message: 'Meta not found.' });
    }

    return successResponse({
      message: 'Meta deleted',
    });

  } catch (error) {
    console.error('dashboardDeleteMeta Error =>', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardDeleteMeta;

