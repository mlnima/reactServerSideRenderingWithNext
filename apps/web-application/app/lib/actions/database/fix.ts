'use server';
import { postSchema, userSchema, connectToDatabase, userRelationSchema, userEngagementSchema } from '@repo/db';
import { IUserEngagement, IUserRelation, User } from '@repo/typescript-types';

export const fixUserDocuments = async () => {
  try {

    await connectToDatabase('getUserInitialPageData');
    const users: User[] = await userSchema.find({}).lean<User[]>();

    for await (const user of users) {

      const postsCount = await postSchema.countDocuments({ author: user._id });
      const userEngagementData = await userEngagementSchema
        .findOne({ userId: user._id })
        .lean<IUserEngagement | null>();

      // @ts-expect-error: it's fine
      const likedPosts = (user?.LikedPosts && user?.LikedPosts.length > 0)
        // @ts-expect-error: it's fine
        ? (await Promise.all(user.LikedPosts.map(async (postId:string) => {
          const exists = await postSchema.exists({ _id: postId });
          return exists ? postId : null;
        }))).filter(Boolean)
        : [];

      if (!userEngagementData) {
        console.log(`creating userEngagement for ${user._id.toString()}`)
        const userEngagementToSave = new userEngagementSchema({
          userId: user._id,
          postsCount,
          likedPosts,
        });
        await userEngagementToSave.save();
      }

      const userRelationData = await userRelationSchema
        .findOne({ userId: user._id })
        .lean<IUserRelation | null>();

      if (!userRelationData) {
        console.log(`creating userRelation for ${user._id.toString()}`)

        const following = (user?.following && user?.following.length > 0)
          ? (await Promise.all(user.following.map(async (userId:string) => {
            const exists = await userSchema.exists({ _id: userId });
            return exists ? userId : null;
          }))).filter(Boolean)
          : [];

        const userRelationToSave = new userRelationSchema({
          userId: user._id,
          followersCount: await userSchema.countDocuments({ following: user._id }) || 0,
          followingCount: following?.length || 0,
          following: following,
        });
        await userRelationToSave.save();
      }
    }

    console.log(`unset old data on users docs`)
    await userSchema.syncIndexes();
    await userSchema.updateMany({}, {
      $unset: {
        posts: 1,
        draftPost: 1,
        followers: 1,
        following: 1,
        blockList: 1,
        followingCount: 1,
        followersCount: 1,
        superAdministrator: 1,
        postsCount: 1,
        disLikedPosts: 1,
        LikedPosts: 1,
        conversation: 1,
      },
    });



    console.log(`done`);
  } catch (error) {
    console.error('Error fixing database:', error);
  }
};


// const updateQuery = (
//   (user?.following && user?.following?.length> 0) &&
//   (
//     !followData ||
//     (followData && !followData.following) ||
//     (followData && followData.following && followData?.following?.length < 1)
//   )
// ) ? { followersCount, followingCount,following:user?.following } :
//   { followersCount, followingCount}