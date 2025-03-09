'use server';
import { IRatePost } from '@lib/actions/database/operations/types';
import { jwtValidator } from '@repo/utils-server/dist/src/validators';
import { JWTPayload } from '@repo/typescript-types';
import { connectToDatabase, postSchema, userSchema } from '@repo/db';
import mongoose, { Types } from 'mongoose';

const ratePost = async ({ token, type, _id }: IRatePost) => {
  try {
    if (!token) return null;
    const tokenData = await jwtValidator(token) as JWTPayload;
    if (!tokenData) return null;
    await connectToDatabase('ratePost');

    const postId = new mongoose.Types.ObjectId(_id);
    const oppositeType = type === 'likes' ? 'disLikes' : 'likes';

    const user = await userSchema.findById(tokenData._id);
    if (!user) return null;

    const userField = type === 'likes' ? 'LikedPosts' : 'disLikedPosts';
    const oppositeField = type === 'likes' ? 'disLikedPosts' : 'LikedPosts';

    const alreadyDone = user[userField].some((id: Types.ObjectId) => id.equals(postId));
    const oppositeDone = user[oppositeField].some((id: Types.ObjectId) => id.equals(postId));

    let userUpdateQuery = {};
    let postIncQuery = { [type]: 0, [oppositeType]: 0 };

    if (oppositeDone) {
      userUpdateQuery = {
        $pull: { [oppositeField]: postId },
        $addToSet: { [userField]: postId },
      };
      postIncQuery[type] = 1;
      postIncQuery[oppositeType] = -1;
    } else if (alreadyDone) {
      userUpdateQuery = { $pull: { [userField]: postId } };
      postIncQuery[type] = -1;
    } else {
      userUpdateQuery = { $addToSet: { [userField]: postId } };
      postIncQuery[type] = 1;
    }

    await userSchema.findByIdAndUpdate(tokenData._id, userUpdateQuery);
    await postSchema.findByIdAndUpdate(postId, { $inc: postIncQuery });
    return null;
  } catch (error) {
    return null;
  }
};

export default ratePost;