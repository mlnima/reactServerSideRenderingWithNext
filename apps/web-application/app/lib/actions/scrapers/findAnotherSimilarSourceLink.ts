'use server';
import { postSchema } from "@repo/db";
import xHSimilarFinder from "./xh/xHSimilarFinder";
import { errorResponse, successResponse } from '@lib/actions/response';


const findAnotherSimilarSourceLink = async (postId:string,relatedBy:string,page:number) => {
  try {
    const postData = await postSchema.findById(postId).select('source');

    if (postData.source) {
      if (postData.source.includes("xhamster")) {
        const relatedPosts = await xHSimilarFinder({
          relatedBy: relatedBy,
          page ,
        });

        return successResponse({
          data: {
            relatedPosts
          },
        });
      }
    }

    return errorResponse({
      message: 'No related posts were found',
    });
  } catch (error) {

    console.log(error);
    return errorResponse({
      message:'Something Went Wrong',
    });

  }
}

export default findAnotherSimilarSourceLink;