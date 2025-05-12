'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import _updateSaveMetas from '@lib/actions/database/operations/metas/_updateOrSaveMeta';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { IPost } from '@repo/typescript-types';

const dashboardCreateNewPost = async (newPost: IPost) => {

  try {

    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    await connectToDatabase('getEditingPost');


    const editedNewPost = {
      ...newPost,
      tags: newPost?.tags ? await _updateSaveMetas(newPost.tags) : [],
      categories: newPost?.categories ? await _updateSaveMetas(newPost.categories) : [],
      actors: newPost?.actors ? await _updateSaveMetas(newPost.actors) : [],
    };
    const newPostDataToSave = new postSchema(editedNewPost);
    const savedPost = newPostDataToSave.save();

    return successResponse({
      data: {
        savedPostData: savedPost,
        message: 'Post Has Been Saved',
      },
    });

  } catch (error) {
    console.log(`dashboardCreateNewPost error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardCreateNewPost;