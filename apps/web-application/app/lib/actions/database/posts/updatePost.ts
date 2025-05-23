'use server';
import { IPost } from '@repo/typescript-types/src/Post';
import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
import { errorResponse, successResponse, ServerActionResponse } from '@lib/actions/response';
import { verifySession } from '@lib/dal';
import { getCurrentDatePath } from '@repo/utils';
import path from 'path';
import { mkdir, writeFile, unlink } from 'fs/promises';
// @ts-expect-error: mime-types may not have default TypeScript types, consider installing @types/mime-types
import mime from 'mime-types';
import mongoose from 'mongoose';

const updatePost = async (formData: FormData): Promise<ServerActionResponse<{ postId: string } | null>> => {
  try {
    await connectToDatabase('updatePost');
    const { isAuth, userId } = await verifySession();

    if (!isAuth || !userId) {
      return errorResponse({ message: 'Unauthorized Access' });
    }

    const jsonData = formData.get('data') as string;
    if (!jsonData) {
      return errorResponse({ message: 'Post data is missing' });
    }

    let parsedPostData: Partial<IPost> & { _id?: string };
    try {
      parsedPostData = JSON.parse(jsonData);
    } catch (parseError: any) {
      return errorResponse({ message: 'Invalid post data format', error: parseError.message });
    }

    const thumbnailFile = formData.get('thumbnail') as File | null;

    const { _id: currentPostId, thumbnail: initialThumbnailValue, ...restOfParsedData } = parsedPostData;
    const dataToSave: any = { ...restOfParsedData };

    if (thumbnailFile) {
      if (currentPostId) {
        const existingPost = await postSchema.findById(currentPostId).select('thumbnail').populate('thumbnail').lean<IPost>();
        if (existingPost?.thumbnail && typeof existingPost.thumbnail === 'object' && (existingPost.thumbnail as any)._id) {
          const oldThumb = existingPost.thumbnail as { _id: mongoose.Types.ObjectId | string, filePath: string };
          if (oldThumb.filePath) {
            try {
              await unlink(path.join(process.cwd(), '..', 'api-server', oldThumb.filePath));
            } catch (e: any) {
              console.warn(`Could not delete old thumbnail file at ${oldThumb.filePath}: ${e.message}`);
            }
          }
          await fileSchema.findByIdAndDelete(oldThumb._id);
        }
      }

      const datePath = getCurrentDatePath('ym');
      const relativeUploadPath = `/public/uploads/images/${datePath}`;
      const publicUploadPath = path.join(process.cwd(), '..', 'api-server', 'public', 'uploads', 'images', datePath);
      await mkdir(publicUploadPath, { recursive: true });

      const arrayBuffer = await thumbnailFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      //const uniqueFileName = `${Date.now()}-${thumbnailFile.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`; // Sanitize filename
      const uniqueFileName = `${encodeURIComponent(parsedPostData?.title as string)}.webp`;
      const fileFullPath = path.join(publicUploadPath, uniqueFileName);
      await writeFile(fileFullPath, buffer);

      const fileUrl = `${relativeUploadPath}/${uniqueFileName}`;
      const mimeType = mime.lookup(fileUrl) || 'application/octet-stream';

      const newFileDoc = new fileSchema({
        usageType: 'postThumbnail',
        filePath: fileUrl,
        mimeType: mimeType,
      });
      const savedFileDoc = await newFileDoc.save();
      dataToSave.thumbnail = savedFileDoc._id.toString();
    } else {
      if (initialThumbnailValue === null) {
        if (currentPostId) {
          const existingPost = await postSchema.findById(currentPostId).select('thumbnail').populate('thumbnail').lean<IPost>();
          if (existingPost?.thumbnail && typeof existingPost.thumbnail === 'object' && (existingPost.thumbnail as any)._id) {
            const oldThumb = existingPost.thumbnail as { _id: mongoose.Types.ObjectId | string, filePath: string };
            if (oldThumb.filePath) {
              try {
                await unlink(path.join(process.cwd(), '..', 'api-server', oldThumb.filePath));
              } catch (e: any) {
                console.warn(`Could not delete old thumbnail file at ${oldThumb.filePath}: ${e.message}`);
              }
            }
            await fileSchema.findByIdAndDelete(oldThumb._id);
          }
        }
        dataToSave.thumbnail = null;
      } else if (initialThumbnailValue && typeof initialThumbnailValue === 'object' && (initialThumbnailValue as any)._id) {
        dataToSave.thumbnail = (initialThumbnailValue as any)._id.toString();
      } else if (typeof initialThumbnailValue === 'string') {
        dataToSave.thumbnail = initialThumbnailValue;
      } else if (initialThumbnailValue === undefined && !currentPostId) {
        dataToSave.thumbnail = null;
      }
    }

    if (dataToSave.author && typeof dataToSave.author === 'object' && (dataToSave.author as any)._id) {
      dataToSave.author = (dataToSave.author as any)._id.toString();
    }

    if (!currentPostId) {
      if (!dataToSave.author) {
        dataToSave.author = userId.toString();
      }
      const countUserPendingPosts = await postSchema.countDocuments({
        author: dataToSave.author,
        status: 'pending',
      });
      if (countUserPendingPosts >= 10) {
        return errorResponse({
          message: 'You cannot have more than 10 pending posts. Please wait for previous posts to be approved.',
        });
      }
      if (!dataToSave.status) {
        dataToSave.status = 'pending';
      }
    } else {
      const postToEdit = await postSchema.findById(currentPostId).select('author').lean<IPost>();
      if (!postToEdit) {
        return errorResponse({ message: "Post not found." });
      }
      if (postToEdit?.author && postToEdit.author.toString() !== userId.toString()) {
        // Add role-based check here if admins/moderators can edit other users' posts(not a good idea from the same page user edit the post)
        return errorResponse({ message: "You are not authorized to edit this post." });
      }
      if ((postToEdit?.author &&  dataToSave.author) && dataToSave.author.toString() !== postToEdit.author.toString()) {
        return errorResponse({ message: "Changing post author is not permitted."});
      }
    }

    if (currentPostId) {
      if (Object.keys(dataToSave).length === 0) {
        return successResponse({ data: { postId: currentPostId }, message: "No effective changes to save." });
      }
      const updatedPost = await postSchema.findByIdAndUpdate(currentPostId, { $set: dataToSave }, { new: true, runValidators: true });
      if (!updatedPost) {
        return errorResponse({ message: 'Post not found or update failed' });
      }
      return successResponse({ data: { postId: updatedPost._id.toString() }, message: 'Post updated successfully' });
    } else {
      const newPostInstance = new postSchema(dataToSave);
      const savedPost = await newPostInstance.save();
      return successResponse({ data: { postId: savedPost._id.toString() }, message: 'Post created successfully' });
    }

  } catch (error: any) {
    console.error("Error in updatePost server action:", error);
    return errorResponse({
      message: error.message || 'An unexpected error occurred while processing your request.',
      error: error.toString(),
    });
  }
};

export default updatePost;