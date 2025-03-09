'use server';
import { postSchema,connectToDatabase } from '@repo/db';

export interface IUpdatePosts{
  ids: string[],
  status: string,
  token: string
}

export const updatePostsStatus = async ({ ids, status }: IUpdatePosts) => {
  try {
    await connectToDatabase('updatePostsStatus');
    let actions;

    if (status === 'delete') {
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

export default updatePostsStatus;