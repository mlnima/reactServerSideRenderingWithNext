'use server';
import { pageSchema, connectToDatabase } from '@repo/db';
import { errorResponse, successResponse } from '@lib/actions/response';
import { IPage } from '@repo/typescript-types';

const dashboardGetPage = async ({ _id }: { _id: string }) => {
  if (!_id) {
    return errorResponse({
      message: 'Not Found',
    });
  }

  try {
    await connectToDatabase('getPage');

    let pageData = await pageSchema.findById(_id).lean<IPage>().exec();

    if (!pageData) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    const serializedData = {
      pageData: JSON.parse(JSON.stringify(pageData)),
    };

    pageData = null;

    return successResponse({
      data: serializedData,
    });
  } catch (error) {
    console.error(`getPage => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardGetPage;
