'use server';
import { connectToDatabase, postSchema } from '@repo/db';

const viewPost = async (_id: string) => {
  let connection;

  try {
    connection = await connectToDatabase('viewPost');
    const session = await connection.startSession();

    try {
      await postSchema.findByIdAndUpdate(
        _id,
        { $inc: { views: 1 } },
        { timestamps: false, session },
      );
    } finally {
      await session.endSession();
    }

    return null;
  } catch (error) {
    console.error(`viewPost => `, error);
    return null;
  }
};

export default viewPost;

// 'use server';
// import { connectToDatabase, postSchema } from '@repo/db';
//
// const viewPost = async (_id: string) => {
//   try {
//     await connectToDatabase('viewPost');
//     await postSchema.findByIdAndUpdate(
//       _id,
//       { $inc: { views: 1 } },
//       { timestamps: false },
//     );
//     return null;
//   } catch (error) {
//     return null;
//   }
// };
//
// export default viewPost;