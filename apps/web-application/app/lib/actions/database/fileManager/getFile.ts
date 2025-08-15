import { fileSchema } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';

export const getFile = async (_id: string) => {
  try {
    const fileDoc = await fileSchema.findById(_id);
    if (!fileDoc) {
      return errorResponse({
        message: 'Not found',
      });
    }

    return successResponse({
      data: {
        file: JSON.parse(JSON.stringify(fileDoc)),
      },
    });
  } catch (error) {
    return errorResponse({
      message: 'Something went wrong',
    });
  }
};
