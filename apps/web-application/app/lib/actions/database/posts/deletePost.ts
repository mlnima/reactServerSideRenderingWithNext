
'use server';
import { IGetEditingPost } from '@lib/actions/database/types';
import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IPost } from '@repo/typescript-types/src/Post';
import { verifySession } from '@lib/dal';
import fs from 'fs/promises';
import path from 'path';

const deletePost = async ({ _id }: IGetEditingPost): Promise<ServerActionResponse<{ message: string } | null>> => {
  let connection;

  try {
    const { isAuth, userId, isAdmin } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    connection = await connectToDatabase('deletePost');
    const session = await connection.startSession();

    try {
      const post = await postSchema
        .findOne({ _id })
        .select('author images thumbnail')
        .populate([
          { path: 'author', select: '_id' },
          { path: 'images', select: 'filePath', model: 'file' },
          { path: 'thumbnail', select: 'filePath' },
        ])
        .session(session)
        .lean<IPost>();

      if (!post) {
        return errorResponse({
          message: 'Not Found',
        });
      }

      if (!isAdmin && userId !== post.author?._id?.toString()) {
        return errorResponse({
          message: 'Unauthorized',
        });
      }

      const fileIdsToDelete: string[] = [];
      const filePathsToDelete: string[] = [];

      if (post.images && post.images.length > 0) {
        for (const image of post.images) {
          if (image?._id) {
            fileIdsToDelete.push(image._id.toString());
          }
          if (image?.filePath) {
            filePathsToDelete.push(image.filePath);
          }
        }
      }

      if (post.thumbnail) {
        if (post.thumbnail._id) {
          fileIdsToDelete.push(post.thumbnail._id.toString());
        }
        if (post.thumbnail.filePath) {
          filePathsToDelete.push(post.thumbnail.filePath);
        }
      }

      if (fileIdsToDelete.length > 0) {
        await fileSchema.deleteMany({ _id: { $in: fileIdsToDelete } }).session(session);
      }

      for (const filePath of filePathsToDelete) {
        if (filePath.includes('public/uploads')) {
          const absolutePath = path.join(process.cwd(), filePath);
          try {
            await fs.unlink(absolutePath);
          } catch (error) {
            console.error(`Error removing file: ${absolutePath}`, error);
          }
        }
      }

      await postSchema.findByIdAndDelete(_id).session(session);

      return successResponse({
        message: 'Deleted',
      });

    } finally {
      await session.endSession();
    }
  } catch (error) {
    console.error(`deletePost => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later',
    });
  }
};

export default deletePost;
// 'use server';
// import { IGetEditingPost } from '@lib/actions/database/types';
// import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { IPost } from '@repo/typescript-types/src/Post';
// import { verifySession } from '@lib/dal';
// import fs from 'fs/promises';
// import path from 'path';
//
// const deletePost = async ({ _id }: IGetEditingPost): Promise<ServerActionResponse<{ post: IPost } | null>> => {
//   try {
//     const { isAuth, userId,isAdmin } = await verifySession();
//
//     if (!isAuth) {
//       return errorResponse({
//         message: 'You Need To Log In',
//       });
//     }
//     await connectToDatabase('getEditingPost');
//
//     const post = await postSchema
//       .findOne({ _id, author: userId }, '-comments -views -likes -disLikes')
//       .populate([
//         {
//           path: 'author',
//           select: ['username', 'profileImage', 'role'],
//           populate: { path: 'profileImage', model: 'file' },
//         },
//         { path: 'categories', select: { name: 1, type: 1 } },
//         { path: 'images', select: { filePath: 1 }, model: 'file' },
//         { path: 'tags', select: { name: 1, type: 1 } },
//         { path: 'actors', select: { name: 1, type: 1, imageUrl: 1 } },
//         { path: 'thumbnail', select: { filePath: 1 } },
//       ])
//       .lean<IPost>();
//
//
//     if (!post) {
//       return errorResponse({
//         message: 'Not Found',
//       });
//     }
//
//     if (isAdmin || userId === post.author?._id ){
//       if (post?.images && post?.images?.length > 0){
//         for await (const image of  post?.images){
//           if (image?.filePath && image?._id && image?.filePath?.includes('public/uploads')){
//             const absolutePath = path.join(process.cwd(), image.filePath);
//             // await fs.unlink(absolutePath);
//             // await fileSchema.findByIdAndDelete(image._id)
//           }
//         }
//       }
//       if (post?.thumbnail){
//         const fileData = await fileSchema.findOne({filePath:post?.thumbnail?.filePath})
//         if (fileData){
//           await fileSchema.findByIdAndDelete(fileData._id)
//         }
//
//         const absolutePath = path.join(process.cwd(), post?.thumbnail?.filePath);
//         try {
//           await fs.unlink(absolutePath);
//         }catch (error){
//           console.log(`error removing the file`,absolutePath)
//           console.log(`error`,error)
//         }
//
//       }
//
//       await postSchema.findByIdAndDelete(_id)
//
//       return successResponse({
//         message: 'Deleted',
//       });
//     }
//
//     return errorResponse({
//       message: 'Unauthorized',
//     });
//
//   } catch (error) {
//     console.error(`getUserPagePosts=> `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
// };
//
// export default deletePost;
//
//
