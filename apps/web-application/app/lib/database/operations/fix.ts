import { connectToDatabase, userSchema, postSchema } from '@repo/db/dist/index';
import {User} from '@repo/typescript-types'

export const fixUserDocuments = async () => {
  try {
    await connectToDatabase('getUserInitialPageData');

    // Remove the 'posts' field from all user documents using updateMany
    await userSchema.updateMany({}, { $unset: { posts: 1 } });

    // Fetch all users without populating or selecting specific fields
    const users : User[] = await userSchema.find({});

    for (const user of users) {
      const followersCount = user.followers?.length || 0;
      const followingCount = user.following?.length || 0;

      // Count the number of posts where this user is the author
      const postsCount = await postSchema.countDocuments({ author: user._id });

      // Update the user document with the new counts using updateOne
      await userSchema.updateOne(
        { _id: user._id },
        { $set: { followersCount, followingCount, postsCount } }
      );
    }
  } catch (error) {
    console.error('Error fixing database:', error);
  }
}