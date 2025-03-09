'use server';
import { connectToDatabase, postSchema } from '@repo/db';

const viewPost = async (_id: string) => {
  try {
    await connectToDatabase('viewPost');
    await postSchema.findByIdAndUpdate(
      _id,
      { $inc: { views: 1 } },
      { timestamps: false },
    );
    return null;
  } catch (error) {
    return null;
  }
};

export default viewPost;