//dashboardUpdatePost
'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

interface IDashboardUpdatePost {
  postData: IPost;
}

const dashboardUpdatePost = async ({ postData }: IDashboardUpdatePost) => {
  try {
    const { userId } = await verifySession();

    if (!postData) {
      return errorResponse({
        message: 'No data was provided',
      });
    }

    await connectToDatabase('dashboardGetPost');

    if (postData?._id) {
      await postSchema.findByIdAndUpdate(postData._id, postData);
      return successResponse({
        message: 'Post Updated',
      });
    } else {
      const newPostToSave = new postSchema({
        ...postData,
        author: userId,
        postType: postData?.postType || 'standard',
        status: postData?.status || 'draft',
      });
      const savedPost = await newPostToSave.save();
      return successResponse({
        message: 'Post Created',
        data: {
          newPostId: savedPost?._id.toString(),
        },
      });
    }

  } catch (error) {
    console.error(`getPost => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
      error,
    });
  }
};

export default dashboardUpdatePost;