'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import xHScrapper from "./xh/xHScrapper";

const postDataScrappers = async (targetUrl:string) => {
  try {

    if (targetUrl.includes('xhamster')) {

      const postData = await xHScrapper(targetUrl)

      return successResponse({
        data: {
          postData
        },
      });

    } else {
      return errorResponse({
        message: 'URL does not supported',
      });
    }
  } catch (error) {
    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }

}

export default postDataScrappers;