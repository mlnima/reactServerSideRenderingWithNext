'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, metaSchema, postSchema } from '@repo/db';

export interface IUpdateMetas {
  ids: string[];
  status: string;
  type: string;
}

const dashboardUpdateMetasStatus = async ({ ids, status, type }: IUpdateMetas): Promise<ServerActionResponse> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    if (!ids || ids.length === 0 || !status || !type) {
      return errorResponse({ message: 'Invalid arguments provided.' });
    }

    await connectToDatabase('dashboardUpdateMetasStatus');

    if (status === 'delete') {
      // --- Deletion Logic ---
      // Step 1: Remove references to these metas from all posts.
      // This prevents posts from having broken relations.
      // The field to update is dynamic based on the 'type' parameter.
      // await postSchema.updateMany({ [type]: { $in: ids } }, { $pull: { [type]: { $in: ids } } }).exec();
      //
      // const deleteResult = await metaSchema.deleteMany({ _id: { $in: ids }, type }).exec();
      //
      // if (deleteResult.deletedCount !== ids.length) {
      //   return errorResponse({
      //     message: 'Could not delete all specified metas.',
      //   });
      // }
    } else {
      await metaSchema.updateMany({ _id: { $in: ids }, type }, { $set: { status } }).exec();
    }

    const message = status === 'delete' ? 'Metas deleted successfully' : 'Status updated successfully';
    return successResponse({ message });
  } catch (error) {
    console.error('dashboardUpdateMetasStatus Error =>', error);
    return errorResponse({
      message: 'An error occurred during the operation.',
    });
  }
};

export default dashboardUpdateMetasStatus;
