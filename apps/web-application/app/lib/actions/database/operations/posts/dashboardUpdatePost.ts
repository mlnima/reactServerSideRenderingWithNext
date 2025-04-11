//dashboardUpdatePost
'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import { IPost } from '@repo/typescript-types';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';

interface IDashboardUpdatePost{
  postData: IPost
}

const dashboardUpdatePost = async ({ postData }: IDashboardUpdatePost)=> {
  try {
    const { isAuth, userId } = await verifySession();

    if (!postData) {
      return errorResponse({
        message: 'Not update data found',
      });
    }
    
    await connectToDatabase('dashboardGetPost');


    if (postData?._id){
     await postSchema.findByIdAndUpdate(postData._id,postData)
    }else {
      const newPostToSave = new postSchema({
        ...postData,
        author: userId,
        status:postData?.status || 'draft'
      })
      const savedPost = await newPostToSave.save()
      return successResponse({
        message: 'Update',
        data:{
          newPostId : savedPost?._id
        }
      });
    }


    // let post = await postSchema
    //   .findById(_id)
    //   .populate([
    //     {
    //       path: 'author',
    //       select: ['username', 'profileImage', 'role'],
    //       populate: { path: 'profileImage', model: 'file' },
    //     },
    //     { path: 'categories', select: { name: 1, type: 1 } },
    //     { path: 'images', select: { filePath: 1 }, model: 'file' },
    //     { path: 'tags', select: { name: 1, type: 1 } },
    //     { path: 'actors', select: { name: 1, type: 1, imageUrl: 1 } },
    //     { path: 'thumbnail', select: { filePath: 1 } },
    //   ])
    //   .lean<IPost>();









  } catch (error) {
    console.error(`getPost => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default dashboardUpdatePost;