'use server';
import { IUpdatePosts } from '@lib/actions/database/types';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, fileSchema, postSchema } from '@repo/db';
import { deleteFileAndDoc } from '@lib/actions/database/fileManager/dashboardDeleteFile';

const dashboardUpdatePostsStatus = async ({
  ids,
  status,
}: IUpdatePosts): Promise<
  ServerActionResponse<{
    message: string;
  } | null>
> => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }
    console.log(`status=> `, status);
    await connectToDatabase('updatePostsStatus');
    if (status === 'delete') {
      const posts = await postSchema.find({ _id: { $in: ids } }).exec();

      for (const post of posts) {
        const [thumbOk, videoOk] = await Promise.all([deleteFileAndDoc(post?.thumbnail), deleteFileAndDoc(post?.video)]);

        if (thumbOk && videoOk) {
          await postSchema.findByIdAndDelete(post._id).exec();
        } else {
          console.warn(`Skipping post ${post._id} — file deletion failed`);
        }
      }

      // const posts = await postSchema.find({ _id: { $in: ids } }).exec();
      //
      // for await (const post of posts) {
      //   if (post?.thumbnail) {
      //     const thumbnailFileDoc = await fileSchema.findById(post?.thumbnail).exec();
      //     if (!thumbnailFileDoc?.filePath.includes('http')) {
      //       const fileAbsolutePath = join(process.cwd(), '..', 'api-server', thumbnailFileDoc?.filePath);
      //       try {
      //         await unlink(fileAbsolutePath);
      //         console.log(`File ${fileAbsolutePath} Deleted`);
      //         await fileSchema.findByIdAndDelete(post?.thumbnail).exec();
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     }
      //   }
      //   if (post?.video) {
      //     const videoFileDoc = await fileSchema.findById(post?.video).exec();
      //     if (!videoFileDoc?.filePath.includes('http')) {
      //       const fileAbsolutePath = join(process.cwd(), '..', 'api-server', videoFileDoc?.filePath);
      //       try {
      //         await unlink(fileAbsolutePath);
      //         console.log(`File ${fileAbsolutePath} Deleted`);
      //         await fileSchema.findByIdAndDelete(post?.video).exec();
      //       } catch (error) {
      //         console.log(error);
      //       }
      //     }
      //   }
      //   await postSchema.findByIdAndDelete(post._id);
      // }
    } else if (status === 'trash') {
      const posts = await postSchema.find({ _id: { $in: ids } }).exec();
      for await (const post of posts) {
        if (post?.thumbnail) {
          await fileSchema.findByIdAndUpdate(post?.thumbnail, { $set: { status: 'trash' } }).exec();
        }
        if (post?.video) {
          await fileSchema.findByIdAndUpdate(post?.video, { $set: { status: 'trash' } }).exec();
        }
      }

      await postSchema.updateMany({ _id: { $in: ids } }, { $set: { status } }).exec();
      console.log(`posts=> `, ids, 'trashed');
    } else {
      await postSchema.updateMany({ _id: { $in: ids } }, { $set: { status } }).exec();
    }

    return successResponse({
      data: {
        message: 'All done',
      },
    });
  } catch (error) {
    console.error(`dashboardUpdatePostsStatus => `, error);
    return errorResponse({
      message: 'Something went wrong, please try again later.',
    });
  }
};

export default dashboardUpdatePostsStatus;
