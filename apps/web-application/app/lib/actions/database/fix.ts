"use server"
import { postSchema, userSchema,connectToDatabase,userRelationSchema,userEngagementSchema } from '@repo/db';
import {User} from '@repo/typescript-types'

export const fixUserDocuments = async () => {
  try {
    await connectToDatabase('getUserInitialPageData');

    // // Remove the 'posts' field from all user documents using updateMany
    // await userSchema.updateMany({}, { $unset: { posts: 1 } });

    // Fetch all users without populating or selecting specific fields
    const users : User[] = await userSchema.find({}).lean<User[]>();

    for await (const user of users) {
      const followersCount = await userSchema.countDocuments({ following: user._id }) || 0;
      const followingCount = user.following?.length || 0;
      const postsCount = await postSchema.countDocuments({ author: user._id });

      await userEngagementSchema.findOneAndUpdate(
        {userId: user._id},
        { $set: {
          postsCount,
          likedPosts:user?.LikedPosts || [],
          disLikedPosts:user?.disLikedPosts || [],
        } }
      )

      const followData = await userRelationSchema.findOne({userId:user._id}).lean<User>();

      const updateQuery = (
        (user?.following && user?.following?.length> 0) &&
        (
          !followData ||
          (followData && !followData.following) ||
          (followData && followData.following && followData?.following?.length < 1)
        )
      ) ? { followersCount, followingCount,following:user?.following } :
        { followersCount, followingCount}

      await userRelationSchema.updateOne(
        { _id: user._id },
        { $set: updateQuery }
      );


    }

    await userSchema.updateMany({}, { $unset: { posts: 1 ,draftPost:1 ,followers:1,following:1,blockList:1,followingCount:1,followersCount:1} });
    console.log(`done=> `,)
  } catch (error) {
    console.error('Error fixing database:', error);
  }
}