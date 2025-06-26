'use server';
import { connectToDatabase, postSchema } from '@repo/db';
import _updateSaveMetas from '@lib/actions/database/metas/_updateOrSaveMeta';
import { verifySession } from '@lib/dal';
import { errorResponse, successResponse } from '@lib/actions/response';
import { IPost } from '@repo/typescript-types';

const dashboardCreateNewPost = async (newPost: IPost) => {
  let connection;
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    connection = await connectToDatabase('dashboardCreateNewPost');
    const session = await connection.startSession();

    try {
      const editedNewPost = {
        ...newPost,
        tags: newPost?.tags ? await _updateSaveMetas(newPost.tags, { session }) : [],
        categories: newPost?.categories ? await _updateSaveMetas(newPost.categories, { session }) : [],
        actors: newPost?.actors ? await _updateSaveMetas(newPost.actors, { session }) : [],
      };

      const newPostDataToSave = new postSchema(editedNewPost);
      let savedPost = await newPostDataToSave.save({ session });

      const serializedData = {
        savedPostData: JSON.parse(JSON.stringify(savedPost)),
        message: 'Post Has Been Saved',
      };

      savedPost = null;

      return successResponse({
        data: serializedData,
      });

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.log(`dashboardCreateNewPost error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardCreateNewPost;

// 'use server';
// import { connectToDatabase, postSchema } from '@repo/db';
// import _updateSaveMetas from '@lib/actions/database/metas/_updateOrSaveMeta';
// import { verifySession } from '@lib/dal';


// import { errorResponse, successResponse } from '@lib/actions/response';
// import { IPost } from '@repo/typescript-types';
//
// const dashboardCreateNewPost = async (newPost: IPost) => {
//
//   try {
//
//     const { isAdmin } = await verifySession();
//
//     if (!isAdmin) {
//       return errorResponse({
//         message: 'Unauthorized Access',
//       });
//     }
//     await connectToDatabase('getEditingPost');
//
//
//     const editedNewPost = {
//       ...newPost,
//       tags: newPost?.tags ? await _updateSaveMetas(newPost.tags) : [],
//       categories: newPost?.categories ? await _updateSaveMetas(newPost.categories) : [],
//       actors: newPost?.actors ? await _updateSaveMetas(newPost.actors) : [],
//     };
//     const newPostDataToSave = new postSchema(editedNewPost);
//     const savedPost = newPostDataToSave.save();
//
//     return successResponse({
//       data: {
//         savedPostData: savedPost,
//         message: 'Post Has Been Saved',
//       },
//     });
//
//   } catch (error) {
//     console.log(`dashboardCreateNewPost error=> `, error);
//
//     return errorResponse({
//       message: 'Something went wrong',
//       error,
//     });
//   }
// };
//
// export default dashboardCreateNewPost;