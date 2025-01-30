'use server';
import {
  connectToDatabase,
  isValidObjectId,
  metaSchema,
  postSchema,
  userSchema,
} from '@repo/db';

import { JWTPayload, Meta, Post } from '@repo/typescript-types';
import { IAdminUpdatePosts } from '@lib/database/operations/admin/types';
import fs from 'fs';

export const adminUpdatePostsStatus = async ({ ids, status, token }: IAdminUpdatePosts) => {
  try {
    console.log('\x1b[33m%s\x1b[0m','status => ', ids, status);
    await connectToDatabase('adminUpdatePostsStatus');
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

      return null
    } else {
      actions = ids.map(async id => {
        return postSchema.findByIdAndUpdate(id, {$set: {status}});
      });
    }
    Promise.all(actions)
      .then(() => {
       return {
         message: 'all done',
       }
      })
      .catch(err => {

        return null;
      });

    return null;
  } catch (error) {
    return null;
  }
};