'use server';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { pageSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IPage } from '@repo/typescript-types';

const getPage = async ({ pageName }: { pageName: string }): Promise<ServerActionResponse<{
  pageData: IPage
} | null>> => {
  'use cache';
  try {
    if (!pageName) {
      return errorResponse({
        message: 'Not Found',
      });
    }
    await connectToDatabase('getPage');
    let pageData = await pageSchema.findOne({ pageName }).lean<IPage>();

    if (!pageData) {
      return errorResponse({
        message: 'Not Found',
      });
    }

    pageData._id = pageData._id.toString();

    cacheTag('cacheItem', `CPage-${pageName}`);


    return successResponse({
      data: {
        pageData,
      },
    });

  } catch (error) {
    console.error(`getPage => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getPage;