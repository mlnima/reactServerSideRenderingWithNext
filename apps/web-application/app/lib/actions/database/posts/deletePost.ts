'use server';
import { IGetEditingPost } from '@lib/actions/database/types';
import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IPost } from '@repo/typescript-types/src/Post';
import { verifySession } from '@lib/dal';
import fs from 'fs/promises';
import path from 'path';

const deletePost = async ({ _id }: IGetEditingPost): Promise<ServerActionResponse<{ message: string } | null>> => {
  try {
    const { isAuth, userId, isAdmin } = await verifySession();

    if (!isAuth) {
      return errorResponse({
        message: 'You Need To Log In',
      });
    }

    await connectToDatabase('deletePost');

    const post = await postSchema
      .findOne({ _id })
      .select('author images thumbnail')
      .populate([
        { path: 'author', select: '_id' },
        { path: 'images', select: 'filePath', model: 'file' },
        { path: 'thumbnail', select: 'filePath' },
      ])

      .lean<IPost>()
      .exec();

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
      await fileSchema.deleteMany({ _id: { $in: fileIdsToDelete } }).exec();
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

    await postSchema.findByIdAndDelete(_id).exec();

    return successResponse({
      message: 'Deleted',
    });
  } catch (error) {
    console.error(`deletePost => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later',
    });
  }
};

export default deletePost;
