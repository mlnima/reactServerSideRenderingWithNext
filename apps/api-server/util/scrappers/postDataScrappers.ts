'use server';
import xHScrapper from "./xh/xHScrapper";
import { errorResponse, successResponse } from 'web-application/app/lib/actions/response';

const postDataScrappers = async (targetUrl) => {
    try {

        if (targetUrl.includes('xhamster')) {

            const urlData = await xHScrapper(targetUrl)

          return successResponse({
            data: {
              urlData: JSON.parse(JSON.stringify(urlData))
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