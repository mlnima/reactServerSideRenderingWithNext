'use server';
import { metaSchema, postSchema, searchKeywordSchema } from '@repo/db';
import { getDefaultLocale, getLocales, universalSanitizer } from '@repo/utils';
import { postFieldRequestForCards } from '@repo/data-structures';
import { IMeta, IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, successResponse } from '@lib/actions/response';
import { z } from 'zod';

export interface IGetSearch {
  sort?: string;
  locale?: string;
  keyword?: string;
  page?: number;
  returnTotalCount?: boolean;
  returnPosts?: boolean;
  returnMetas?: boolean;
}

const escapeRegex = (string: string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

const createSafeSearchQuery = (keyword: string, field: string) => {
  try {
    const escapedKeyword = escapeRegex(keyword);
    return { [field]: { $regex: escapedKeyword, $options: 'i' } };
  } catch (error) {
    console.warn(`Regex failed for keyword: ${keyword}, using exact match`);
    return { [field]: keyword };
  }
};

// const createSafeSearchQuery = (keyword: string, field: string) => {
//   try {
//     return { [field]: { $regex: keyword, $options: 'i' } };
//   } catch (error) {
//     console.warn(`Regex failed for keyword: ${keyword}, using exact match`);
//     return { [field]: keyword };
//   }
// };

const shouldSaveKeyword = (keyword: string): boolean => {
  if (!keyword || keyword.length < 3) return false;

  const obviousMaliciousPatterns = [
    /^[\d\s\+\-\*\/\(\)\.]+$/,
    /waitfor.*delay/i,
    /union.*select/i,
    /drop.*table/i,
  ];

  return !obviousMaliciousPatterns.some(pattern => pattern.test(keyword));
};


// const _saveSearchedKeyword = async (keyword: string, postsCount: number) => {
//   if (!shouldSaveKeyword(keyword)) {
//     return;
//   }
//
//   try {
//     await searchKeywordSchema.findOneAndUpdate(
//       { name: keyword },
//       {
//         $set: {
//           name: keyword,
//           count: postsCount,
//         }
//       },
//       {
//         upsert: true,
//         new: true,
//         rawResult: true,
//       },
//     );
//   } catch (error) {
//     console.log('saveSearchedKeyword Error=> ', error);
//   }
// };

const _saveSearchedKeyword = async (keyword: string, postsCount: number) => {
  if (!shouldSaveKeyword(keyword)) {
    return;
  }

  try {
    const existingKeyword = await searchKeywordSchema.findOne({ name: keyword });

    if (!existingKeyword) {
      const dataToSave = new searchKeywordSchema({
        name: keyword,
        count: postsCount,
      })
      dataToSave.save()
      console.log(`search keyword ${keyword} saved`,)
    }

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    if (existingKeyword.updatedAt < oneWeekAgo) {
      console.log(`console=> `,)
      existingKeyword.count = postsCount;
      await existingKeyword.save();
    }

  } catch (error) {
    console.log('saveSearchedKeyword Error=> ', error);
  }
};

export const getSearch = async (
  {
    keyword,
    page = 1,
    locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
    sort = '-updatedAt -createdAt',
    returnTotalCount = true,
    returnPosts = true,
    returnMetas = true,
  }: IGetSearch) => {
  'use cache';

  try {
    if (!keyword) return null;

    // Lightweight validation - only block obvious attacks
    const { isValid, sanitized, reason } = universalSanitizer(keyword,'search');

    if (!isValid) {
      console.warn(`Search blocked: ${reason} - ${keyword?.substring(0, 50)}`);
      // Return empty results instead of error for better UX
      return errorResponse({
        message: 'Nice Try 😘',
      });

    }

    const targetKeyword = sanitized;
    const defaultLocale = getDefaultLocale();
    const locales = getLocales();
    const size = 20;

    // Build search queries using safe MongoDB operations
    let postsTranslationsSearchQuery = [];
    let metasTranslationsSearchQuery = [];

    if (locale !== defaultLocale) {
      for (const locale of locales) {
        metasTranslationsSearchQuery.push(
          createSafeSearchQuery(targetKeyword, `translations.${locale}.name`)
        );
      }
      for (const locale of locales) {
        postsTranslationsSearchQuery.push(
          createSafeSearchQuery(targetKeyword, `translations.${locale}.title`)
        );
        postsTranslationsSearchQuery.push(
          createSafeSearchQuery(targetKeyword, `translations.${locale}.description`)
        );
      }
    }

    const postSearchQuery = {
      $and: [
        {
          $or: [
            createSafeSearchQuery(targetKeyword, 'title'),
            createSafeSearchQuery(targetKeyword, 'description'),
            ...postsTranslationsSearchQuery,
          ],
        },
        { status: 'published' },
      ],
    };

    const metasSearchQuery = {
      $and: [
        {
          $or: [
            createSafeSearchQuery(targetKeyword, 'name'),
            ...metasTranslationsSearchQuery,
          ],
        },
        { status: 'published' },
      ],
    };

    let posts = returnPosts ? await postSchema
      .find(postSearchQuery, postFieldRequestForCards, {
        limit: size,
        skip: size * page - size,
        sort,
      })
      .select([...postFieldRequestForCards, `translations.${locale}.title`])
      .lean<IPost[]>() : [];

    const totalCount = returnTotalCount ? await postSchema.countDocuments(postSearchQuery) : 0;

    let metas = returnMetas ? await metaSchema
      .find(metasSearchQuery, {}, { sort })
      .limit(size)
      .lean<IMeta[]>() : [];

    const { actors, categories, tags } = returnMetas
      ? (metas || []).reduce(
        (acc: Record<string, IMeta[]>, meta: IMeta) => {
          const type = meta.type;
          acc[type] = [...(acc[type] || []), meta];
          return acc;
        },
        { actors: [], categories: [], tags: [] },
      )
      : { actors: [], categories: [], tags: [] };

    if (totalCount > 0) {
      await _saveSearchedKeyword(targetKeyword, totalCount);
    }

    const cacheKey = `CSearch-${targetKeyword}-p${page}-s${sort}-l${locale}`;
    cacheTag('cacheItem','CSearch', cacheKey);
    // cacheTag('cacheItem', `CGetSearch-${targetKeyword}`);

    return successResponse({
      data: {
        posts: JSON.parse(JSON.stringify(posts)),
        totalCount,
        actors: JSON.parse(JSON.stringify(actors)),
        categories: JSON.parse(JSON.stringify(categories)),
        tags: JSON.parse(JSON.stringify(tags)),
      },
    });

  } catch (error) {
    console.error(`getSearch Error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getSearch;


// 'use server';
// import { metaSchema, postSchema, searchKeywordSchema } from '@repo/db';
// import { getDefaultLocale, getLocales } from '@repo/utils';
// import { postFieldRequestForCards } from '@repo/data-structures';
// import { IMeta, IPost } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, successResponse } from '@lib/actions/response';
//
// export interface IGetSearch {
//   sort?: string;
//   locale?: string;
//   keyword?: string;
//   page?: number;
//   returnTotalCount?: boolean;
//   returnPosts?: boolean;
//   returnMetas?: boolean;
// }
//
// const _saveSearchedKeyword = async (keyword: string, postsCount: number) => {
//   if (!keyword || keyword.length < 3) return;
//   try {
//     await searchKeywordSchema
//       .findOneAndUpdate(
//         { name: keyword },
//         {
//           $set: {
//             name: keyword,
//             count: postsCount,
//           },
//           // $inc: { searchHits: 1 },
//         },
//         { upsert: true },
//       );
//     console.log(`keyword ${keyword} Saved in DB with ${postsCount} result`);
//   } catch (error) {
//     console.log('_saveSearchedKeyword Error=> ', error);
//   }
// };
//
// export const getSearch = async (
//   {
//     keyword,
//     page = 1,
//     locale = process.env.NEXT_PUBLIC_DEFAULT_LOCALE,
//     sort = '-updatedAt -createdAt',
//     returnTotalCount = true,
//     returnPosts = true,
//     returnMetas = true,
//   }: IGetSearch) => {
//   'use cache';
//
//   try {
//     if (!keyword) return null;
//     const defaultLocale = getDefaultLocale();
//     const locales = getLocales();
//     let targetKeyword = decodeURIComponent(keyword).toLowerCase();
//
//     const size = 20;
//
//     let postsTranslationsSearchQuery = [];
//     let metasTranslationsSearchQuery = [];
//
//     if (locale !== defaultLocale) {
//       for await (const locale of locales) {
//         metasTranslationsSearchQuery.push({
//           [`translations.${locale}.name`]: new RegExp(targetKeyword, 'i'),
//         });
//       }
//       for await (const locale of locales) {
//         postsTranslationsSearchQuery.push({
//           [`translations.${locale}.title`]: new RegExp(targetKeyword, 'i'),
//         });
//         postsTranslationsSearchQuery.push({
//           [`translations.${locale}.description`]: new RegExp(targetKeyword, 'i'),
//         });
//       }
//     }
//
//     const postSearchQuery = {
//       $and: [
//         {
//           $or: [
//             { title: new RegExp(targetKeyword, 'i') },
//             { description: new RegExp(targetKeyword, 'i') },
//             ...postsTranslationsSearchQuery,
//           ],
//         },
//         { status: 'published' },
//       ],
//     };
//
//     const metasSearchQuery = {
//       $and: [
//         {
//           $or: [
//             { name: new RegExp(targetKeyword, 'i') },
//             ...metasTranslationsSearchQuery,
//           ],
//         },
//         { status: 'published' },
//       ],
//     };
//
//     let posts = returnPosts ? await postSchema
//       .find(postSearchQuery, postFieldRequestForCards, {
//         limit: size,
//         skip: size * page - size,
//         sort,
//       })
//       .select([...postFieldRequestForCards, `translations.${locale}.title`])
//       .lean<IPost[]>() : [];
//
//     const totalCount = returnTotalCount ? await postSchema.countDocuments(postSearchQuery) : 0;
//
//     let metas = returnMetas ? await metaSchema
//       .find(metasSearchQuery, {}, { sort })
//       .limit(size)
//       .lean<IMeta[]>() : [];
//
//     const { actors, categories, tags } = returnMetas
//       ? (metas || []).reduce(
//         (acc: Record<string, IMeta[]>, meta: IMeta) => {
//           const type = meta.type; // Assume meta.type is guaranteed to be defined
//           acc[type] = [...(acc[type] || []), meta];
//           return acc;
//         },
//         { actors: [], categories: [], tags: [] },
//       )
//       : { actors: [], categories: [], tags: [] };
//
//     if (totalCount > 0) {
//       await _saveSearchedKeyword(targetKeyword, totalCount);
//     }
//
//     cacheTag('cacheItem', `CGetSearch-${targetKeyword}`);
//
//     return successResponse({
//       data: {
//         posts: JSON.parse(JSON.stringify(posts)),
//         totalCount,
//         actors: JSON.parse(JSON.stringify(actors)) ,
//         categories: JSON.parse(JSON.stringify(categories)) ,
//         tags: JSON.parse(JSON.stringify(tags))  ,
//       },
//     });
//
//   } catch (error) {
//     console.error(`getSearch Error=> `, error);
//     return errorResponse({
//       message: 'Something went wrong please try again later',
//     });
//   }
//
// };
//
// export default getSearch;








// // Lightweight input sanitization - only block obvious attacks
// const sanitizeKeyword = (keyword: string): { isValid: boolean; sanitized: string; reason?: string } => {
//   if (!keyword || typeof keyword !== 'string') {
//     return { isValid: false, sanitized: '', reason: 'Empty keyword' };
//   }
//
//   let sanitized = decodeURIComponent(keyword).trim();
//
//   // Basic length checks
//   if (sanitized.length < 1) {
//     return { isValid: false, sanitized: '', reason: 'Too short' };
//   }
//
//   if (sanitized.length > 200) {
//     return { isValid: false, sanitized: '', reason: 'Too long' };
//   }
//
//   // Only block OBVIOUS SQL injection attempts - be very specific
//   const criticalPatterns = [
//     /;\s*drop\s+/i,                    // DROP statements
//     /;\s*delete\s+from\s+/i,           // DELETE statements
//     /;\s*update\s+.+\s+set\s+/i,       // UPDATE statements
//     /;\s*insert\s+into\s+/i,           // INSERT statements
//     /;\s*create\s+(table|database)/i,   // CREATE statements
//     /waitfor\s+delay\s+['"][\d:]+['"]/i, // SQL Server time delays
//     /pg_sleep\s*\(/i,                  // PostgreSQL sleep
//     /sleep\s*\(\s*\d+\s*\)/i,          // MySQL sleep
//     /benchmark\s*\(/i,                 // MySQL benchmark
//     /information_schema/i,             // Schema enumeration
//     /union\s+all\s+select/i,           // UNION attacks
//   ];
//
//   for (const pattern of criticalPatterns) {
//     if (pattern.test(sanitized)) {
//       console.warn(`[SECURITY] Blocked SQL injection attempt: ${sanitized.substring(0, 50)}...`);
//       return { isValid: false, sanitized: '', reason: 'Suspicious pattern detected' };
//     }
//   }
//
//   // Clean up whitespace but preserve the search intent
//   sanitized = sanitized.replace(/\s+/g, ' ').toLowerCase();
//
//   return { isValid: true, sanitized };
// };
