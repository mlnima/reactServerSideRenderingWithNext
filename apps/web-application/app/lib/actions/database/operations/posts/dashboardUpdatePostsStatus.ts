'use server';
import { IUpdatePosts } from '@lib/actions/database/operations/types';
import { verifySession } from '@lib/dal';
import { errorResponse } from '@lib/actions/response';
import { connectToDatabase, postSchema } from '@repo/db';

const dashboardUpdatePostsStatus = async ({ ids, status }: IUpdatePosts) => {
  try {
    const { isAdmin } = await verifySession();

    if (!isAdmin) {
      return errorResponse({
        message: 'Unauthorized Access',
      });
    }

    await connectToDatabase('updatePostsStatus');

    let actions;

    if (status === 'delete') {
      //***** it require to delete post thumbnail from express server, Need fix


      // actions = ids.map(async id => {
      //   return postSchema
      //     .findByIdAndDelete(id)
      //     .exec()
      //     .then(doc => {
      //       if (!doc.mainThumbnail.includes('http')) {
      //         fs.unlinkSync(`.${doc.mainThumbnail}`);
      //       }
      //     });
      // });

      return null;
    } else {
      actions = ids.map(async id => {
        return postSchema.findByIdAndUpdate(id, { $set: { status } });
      });
    }

    Promise.all(actions)
      .then(() => {
        return {
          message: 'all done',
        };
      })
      .catch((error) => {

        return null;
      });

    return null;
  } catch (error) {
    return null;
  }
};

export default dashboardUpdatePostsStatus;