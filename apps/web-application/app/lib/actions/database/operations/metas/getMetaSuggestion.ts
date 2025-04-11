'use server';
import { connectToDatabase, metaSchema } from '@repo/db';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';
import { IMeta } from '@repo/typescript-types';

interface IGetMetaSuggestion {
  metaType: string,
  status?: string,
  startWith: string
}

const getMetaSuggestion = async (
  {
    metaType,
    status = 'published',
    startWith,
  }: IGetMetaSuggestion): Promise<ServerActionResponse<{
  suggestions: { value: string, label: string }[],
} | null>> => {
  // 'use cache';
  try {
    await connectToDatabase('getMetaSuggestion');
    const startWithQuery =
      startWith === 'any'
        ? {}
        : {
          name: {
            $regex: '^' + startWith,
            $options: 'i',
          },
        };

    let metas = await metaSchema
      .find({ $and: [{ type: metaType }, startWithQuery, { status }] }, 'name type', {
        sort: { updatedAt: -1 },
      })
      .limit(10)
      .lean<IMeta[]>();


    const suggestions = metas.map((meta) => {
      return {
        value: meta._id.toString(),
        label: meta.name,
      };
    });

    // cacheTag(
    //   'cacheItem',
    //   `CGetMetaSuggestion-${metaType ? `-${metaType}` : ''}${startWith ? `-${startWith}` : ''}`,
    // );

    return successResponse({
      data: {
        suggestions,
      },
    });

  } catch (error) {
    console.error(`getMetaSuggestion => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getMetaSuggestion;