'use server';
import { pageSchema, connectToDatabase } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IPage } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';

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

    cacheTag('cacheItem', `CPage-${pageName}`);

    return successResponse({
      data: {
        pageData: JSON.parse(JSON.stringify(pageData)),
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