"use server"
import { postSchema, userSchema,connectToDatabase } from '@repo/db';
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

      console.log('\x1b[33m%s\x1b[0m','updated  => ', user._id );
    }

    await userSchema.updateMany({}, { $unset: { followers: 1 } });



  } catch (error) {
    console.error('Error fixing database:', error);
  }
}