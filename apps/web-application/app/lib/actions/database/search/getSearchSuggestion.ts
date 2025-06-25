'use server';
import { connectToDatabase, searchKeywordSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { ISuggestion } from '@repo/typescript-types';

const getSearchSuggestion = async (userInput: string): Promise<ServerActionResponse<{
  suggestions: ISuggestion[]
} | null>> => {
  'use cache';

  let connection;

  try {
    connection = await connectToDatabase('getSearchSuggestion');

    if (!userInput) {
      return errorResponse({});
    }

    const session = await connection.startSession();

    try {
      const regex = new RegExp(`^${userInput}`, 'i');

      // Execute query with session
      let suggestions = await searchKeywordSchema
        .find(
          { name: regex },
          {
            name: 1,
            count: 1,
          }
        )
        .session(session)
        .lean<ISuggestion[]>();

      // Serialize the data to avoid memory references
      const serializedSuggestions = JSON.parse(JSON.stringify(suggestions.map(keyword => ({
        ...keyword,
        _id: keyword._id.toString()
      }))));

      // Clean up references
      suggestions = null;

      cacheTag('cacheItem', `CGetSearchSuggestion-${userInput}`);
      cacheLife('minutes');

      return successResponse({
        data: {
          suggestions: serializedSuggestions,
        },
      });

    } finally {
      // Always end the session
      await session.endSession();
    }

  } catch (error) {
    console.error(`getSearchSuggestion => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later'
    });
  }
};

export default getSearchSuggestion;






// 'use server';
// import { connectToDatabase, searchKeywordSchema } from '@repo/db';
// import { unstable_cacheTag as cacheTag } from 'next/cache';
// import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
// import { ISuggestion } from '@repo/typescript-types';
//
// const getSearchSuggestion = async (userInput: string): Promise<ServerActionResponse<{
//   suggestions: ISuggestion[]
// } | null>> => {
//   'use cache';
//   try {
//     await connectToDatabase('getSearchSuggestion');
//     if (!userInput) {
//       return errorResponse({});
//     }
//
//     const regex = new RegExp(`^${userInput}`, 'i');
//     let suggestions = await searchKeywordSchema.find(
//       { name: regex },
//       {
//         name: 1,
//         count: 1,
//       },
//     ).lean<ISuggestion[]>();
//
//     suggestions = suggestions.map(keyword => {
//       keyword._id = keyword._id.toString();
//       return keyword;
//     });
//
//     cacheTag('cacheItem', `CGetSearchSuggestion-${userInput}`);
//
//
//     return successResponse({
//       data: {
//         suggestions,
//       },
//     });
//   } catch (error) {
//     return errorResponse({ error });
//   }
// };
//
// export default getSearchSuggestion;