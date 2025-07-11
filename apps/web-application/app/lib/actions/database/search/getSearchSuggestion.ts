'use server';
import { connectToDatabase, searchKeywordSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { ISuggestion } from '@repo/typescript-types';

const getSearchSuggestion = async (
  userInput: string,
): Promise<
  ServerActionResponse<{
    suggestions: ISuggestion[];
  } | null>
> => {
  'use cache';

  try {
    await connectToDatabase('getSearchSuggestion');

    if (!userInput) {
      return errorResponse({});
    }
    const regex = new RegExp(`^${userInput}`, 'i');

    let suggestions = await searchKeywordSchema
      .find(
        { name: regex },
        {
          name: 1,
          count: 1,
        },
      )

      .lean<ISuggestion[]>()
      .exec();

    const serializedSuggestions = JSON.parse(
      JSON.stringify(
        suggestions.map((keyword) => ({
          ...keyword,
          _id: keyword._id.toString(),
        })),
      ),
    );

    suggestions = null;

    cacheTag('cacheItem', `CGetSearchSuggestion-${userInput}`);

    return successResponse({
      data: {
        suggestions: serializedSuggestions,
      },
    });
  } catch (error) {
    console.error(`getSearchSuggestion => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
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