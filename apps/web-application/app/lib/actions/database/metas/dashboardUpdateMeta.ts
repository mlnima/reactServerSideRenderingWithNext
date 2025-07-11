'use server';
import { connectToDatabase, metaSchema } from '@repo/db';
import { IMeta } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

const dashboardUpdateMeta = async ({
  updatingData,
}: {
  updatingData: IMeta;
}): Promise<
  ServerActionResponse<{
    meta: IMeta;
  } | null>
> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    if (!updatingData || !updatingData._id) {
      return errorResponse({
        message: 'No Data or ID Provided',
      });
    }

    await connectToDatabase('dashboardUpdateMeta');

    let updatedMeta = await metaSchema.findByIdAndUpdate(updatingData._id, updatingData, { new: true });

    if (!updatedMeta) {
      return errorResponse({ message: 'Meta not found for update.' });
    }

    const serializedData = {
      meta: JSON.parse(JSON.stringify(updatedMeta)),
    };

    updatedMeta = null;

    return successResponse({
      data: serializedData,
      message: 'Updated',
    });
  } catch (error) {
    console.error('dashboardUpdateMeta Error =>', error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdateMeta;
