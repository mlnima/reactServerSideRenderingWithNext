'use server';
import { postSchema, userSchema, connectToDatabase, userRelationSchema, userEngagementSchema,searchKeywordSchema } from '@repo/db';
// import { IUserEngagement, IUserRelation, User } from '@repo/typescript-types';
import { universalSanitizer } from '@repo/utils';
// import { z } from 'zod';
// import xss from 'xss'

// export const fixUserDocuments = async () => {
//   try {
//
//     await connectToDatabase('getUserInitialPageData');
//     const users: User[] = await userSchema.find({}).lean<User[]>();
//
//     for await (const user of users) {
//
//       const postsCount = await postSchema.countDocuments({ author: user._id });
//       const userEngagementData = await userEngagementSchema
//         .findOne({ userId: user._id })
//         .lean<IUserEngagement | null>();
//
//       // @ts-expect-error: it's fine
//       const likedPosts = (user?.LikedPosts && user?.LikedPosts.length > 0)
//         // @ts-expect-error: it's fine
//         ? (await Promise.all(user.LikedPosts.map(async (postId:string) => {
//           const exists = await postSchema.exists({ _id: postId });
//           return exists ? postId : null;
//         }))).filter(Boolean)
//         : [];
//
//       if (!userEngagementData) {
//         console.log(`creating userEngagement for ${user._id.toString()}`)
//         const userEngagementToSave = new userEngagementSchema({
//           userId: user._id,
//           postsCount,
//           likedPosts,
//         });
//         await userEngagementToSave.save();
//       }
//
//       const userRelationData = await userRelationSchema
//         .findOne({ userId: user._id })
//         .lean<IUserRelation | null>();
//
//       if (!userRelationData) {
//         console.log(`creating userRelation for ${user._id.toString()}`)
//
//         const following = (user?.following && user?.following.length > 0)
//           ? (await Promise.all(user.following.map(async (userId:string) => {
//             const exists = await userSchema.exists({ _id: userId });
//             return exists ? userId : null;
//           }))).filter(Boolean)
//           : [];
//
//         const userRelationToSave = new userRelationSchema({
//           userId: user._id,
//           followersCount: await userSchema.countDocuments({ following: user._id }) || 0,
//           followingCount: following?.length || 0,
//           following: following,
//         });
//         await userRelationToSave.save();
//       }
//     }
//
//     console.log(`unset old data on users docs`)
//     await userSchema.syncIndexes();
//     await userSchema.updateMany({}, {
//       $unset: {
//         posts: 1,
//         draftPost: 1,
//         followers: 1,
//         following: 1,
//         blockList: 1,
//         followingCount: 1,
//         followersCount: 1,
//         superAdministrator: 1,
//         postsCount: 1,
//         disLikedPosts: 1,
//         LikedPosts: 1,
//         conversation: 1,
//       },
//     });
//     console.log(`done`);
//   } catch (error) {
//     console.error('Error fixing database:', error);
//   }
// };

export const fixSearchKeywords = async () => {
  try {
    console.log('Starting search keywords cleanup...');
    const allKeywords = await searchKeywordSchema.find({}).lean();
    console.log(`Found ${allKeywords.length} total search keywords to check`);

    for (const keyword of allKeywords) {
       const { isValid, sanitized, reason } = universalSanitizer(keyword.name,'search')

      if (!isValid) {
        try {
          console.warn(`keyword deleted: ${reason} - ${keyword?.name?.substring(0, 50)}`);
        } catch (deleteError) {
          console.error(`Failed to delete keyword "${keyword.name}":`, deleteError);
        }
      }else{
        console.log(`${keyword?.name?.substring(0, 50)} is valid `,)
      }
    }
  } catch (error) {
    console.error('Error during search keywords cleanup:', error);
    return {
      success: false,
      error: error.message
    };
  }
};
