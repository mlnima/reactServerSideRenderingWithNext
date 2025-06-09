'use server';
import { postSchema, userSchema, connectToDatabase, userRelationSchema, userEngagementSchema,searchKeywordSchema } from '@repo/db';
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

export const fixSearchKeywords = async () => {
  try {
    console.log('Starting search keywords cleanup...');

    // Define patterns for malicious keywords
    const maliciousPatterns = [
      // SQL Injection patterns
      /waitfor\s+delay/i,
      /union\s+select/i,
      /drop\s+table/i,
      /delete\s+from/i,
      /insert\s+into/i,
      /update\s+.+set/i,
      /exec\s*\(/i,
      /cast\s*\(/i,
      /convert\s*\(/i,
      /information_schema/i,
      /pg_sleep/i,
      /benchmark\s*\(/i,
      /sleep\s*\(/i,
      /['";].*?(-{2,}|\/\*|\*\/)/i, // SQL comments

      // XSS patterns
      /<script/i,
      /javascript:/i,
      /on\w+\s*=/i,

      // Pure mathematical expressions
      /^[\d\s\+\-\*\/\^\(\)\.]+$/,
      /[\*\+\-\/\^]{2,}/, // Multiple consecutive operators

      // Suspicious characters/patterns
      /[<>{}[\]]/,
      /\|\||&&/,
      /[`;]/,

      // Common hacking attempts
      /\bor\s+1\s*=\s*1/i,
      /\band\s+1\s*=\s*1/i,
      /\'\s*or\s*\'/i,
      /\"\s*or\s*\"/i,
      /\bselect\s+\*/i,
      /\bfrom\s+\w+/i,
      /\bwhere\s+1\s*=\s*1/i,

      // Time-based attacks
      /waitfor.*delay/i,
      /pg_sleep\s*\(/i,
      /sleep\s*\(\s*\d+/i,

      // Path traversal
      /\.\.\//,
      /\.\.\\/,

      // Command injection
      /;\s*(ls|cat|pwd|whoami|id|uname)/i,
      /\|\s*(ls|cat|pwd|whoami|id|uname)/i,

      // Suspicious encoded content
      /%27/i, // encoded single quote
      /%22/i, // encoded double quote
      /%3C/i, // encoded <
      /%3E/i, // encoded >

      // Very long suspicious strings
      /^.{100,}$/, // Keywords longer than 100 chars are suspicious
    ];

    // Additional checks for obviously malicious content
    const suspiciousKeywords = [
      // Common SQL injection payloads
      'admin\'--',
      'admin\'/*',
      '\' or 1=1--',
      '\' or 1=1#',
      '\' or 1=1/*',
      'union select null',
      'union all select',
      'or 1=1',
      'and 1=1',
      '\' union select',
      '\' and 1=1',
      '\' or \'a\'=\'a',
      '1\' or \'1\'=\'1',

      // XSS payloads
      '<script>alert(',
      'javascript:alert(',
      '<img src=x onerror=',

      // Path traversal
      '../../../etc/passwd',
      '..\\..\\..\\windows',

      // Command injection
      '; ls -la',
      '| whoami',
      '&& id',

      // Suspicious mathematical expressions
      '1*1*1*1*1',
      '999*999*999',
      '1+1+1+1+1+1+1+1+1+1',
    ];

    let totalDeleted = 0;
    const deletedKeywords = [];

    // Get all search keywords
    const allKeywords = await searchKeywordSchema.find({}).lean();
    console.log(`Found ${allKeywords.length} total search keywords to check`);

    for (const keyword of allKeywords) {
      let shouldDelete = false;
      let reason = '';

      // Check against regex patterns
      for (const pattern of maliciousPatterns) {
        if (keyword.name.length < 3 || pattern.test(keyword.name)) {
          shouldDelete = true;
          reason = `Matched malicious pattern: ${pattern.source}`;
          break;
        }
      }

      // Check against suspicious keywords list
      if (!shouldDelete) {
        const lowerName = keyword.name.toLowerCase();
        for (const suspicious of suspiciousKeywords) {
          if (lowerName.includes(suspicious.toLowerCase())) {
            shouldDelete = true;
            reason = `Contains suspicious keyword: ${suspicious}`;
            break;
          }
        }
      }

      // Additional heuristic checks
      if (!shouldDelete) {
        // Check for non-printable characters
        if (/[\x00-\x1F\x7F-\x9F]/.test(keyword.name)) {
          shouldDelete = true;
          reason = 'Contains non-printable characters';
        }

        // Check for excessive special characters
        const specialCharCount = (keyword.name.match(/[^a-zA-Z0-9\s\u00C0-\u017F\u0600-\u06FF\u0750-\u077F\u4e00-\u9fff]/g) || []).length;
        if (specialCharCount > keyword.name.length * 0.5) {
          shouldDelete = true;
          reason = 'Excessive special characters';
        }

        // Check for pure numeric with operators (math expressions)
        if (/^[\d\s\+\-\*\/\(\)\.]+$/.test(keyword.name) && /[\+\-\*\/]/.test(keyword.name)) {
          shouldDelete = true;
          reason = 'Mathematical expression';
        }
      }

      if (shouldDelete) {
        try {
          await searchKeywordSchema.findByIdAndDelete(keyword._id);
          deletedKeywords.push({
            name: keyword.name,
            reason: reason,
            count: keyword.count,
            searchHits: keyword.searchHits
          });
          totalDeleted++;

          // Log individual deletions for audit
          console.log(`Deleted malicious keyword: "${keyword.name}" - ${reason}`);
        } catch (deleteError) {
          console.error(`Failed to delete keyword "${keyword.name}":`, deleteError);
        }
      }
    }

    // Summary report
    console.log('\n=== CLEANUP SUMMARY ===');
    console.log(`Total keywords checked: ${allKeywords.length}`);
    console.log(`Malicious keywords deleted: ${totalDeleted}`);
    console.log(`Clean keywords remaining: ${allKeywords.length - totalDeleted}`);

    if (deletedKeywords.length > 0) {
      console.log('\n=== DELETED KEYWORDS ===');
      deletedKeywords.forEach((kw, index) => {
        console.log(`${index + 1}. "${kw.name}" (${kw.count} results, ${kw.searchHits} hits) - ${kw.reason}`);
      });
    }

    return {
      success: true,
      totalChecked: allKeywords.length,
      totalDeleted: totalDeleted,
      deletedKeywords: deletedKeywords
    };

  } catch (error) {
    console.error('Error during search keywords cleanup:', error);
    return {
      success: false,
      error: error.message
    };
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