'use server';
import { connectToDatabase, postSchema } from '@repo/db';

const viewPost = async (_id: string) => {
  try {
    await connectToDatabase();

    await postSchema.findByIdAndUpdate(_id, { $inc: { views: 1 } }, { timestamps: false }).exec();

    return null;
  } catch (error) {
    console.error(`viewPost => `, error);
    return null;
  }
};

export default viewPost;
