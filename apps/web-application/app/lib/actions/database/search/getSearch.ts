'use server';
import { metaSchema, postSchema, searchKeywordSchema } from '@repo/db';
import { getDefaultLocale, getLocales } from '@repo/utils';
import { postFieldRequestForCards } from '@repo/data-structures';
import { IMeta, IPost } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, successResponse } from '@lib/actions/response';

export interface IGetSearch {
  sort?: string;
  locale?: string;
  keyword?: string;
  page?: number;
  returnTotalCount?: boolean;
  returnPosts?: boolean;
  returnMetas?: boolean;
}

const _saveSearchedKeyword = async (keyword: string, postsCount: number) => {
  if (!keyword || keyword.length < 3) return;
  try {
    await searchKeywordSchema
      .findOneAndUpdate(
        { name: keyword },
        {
          $set: {
            name: keyword,
            count: postsCount,
          },
          // $inc: { searchHits: 1 },
        },
        { upsert: true },
      );
    console.log(`keyword ${keyword} Saved in DB with ${postsCount} result`);
  } catch (error) {
    console.log('_saveSearchedKeyword Error=> ', error);
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
    const defaultLocale = getDefaultLocale();
    const locales = getLocales();
    let targetKeyword = decodeURIComponent(keyword).toLowerCase();

    const size = 20;

    let postsTranslationsSearchQuery = [];
    let metasTranslationsSearchQuery = [];

    if (locale !== defaultLocale) {
      for await (const locale of locales) {
        metasTranslationsSearchQuery.push({
          [`translations.${locale}.name`]: new RegExp(targetKeyword, 'i'),
        });
      }
      for await (const locale of locales) {
        postsTranslationsSearchQuery.push({
          [`translations.${locale}.title`]: new RegExp(targetKeyword, 'i'),
        });
        postsTranslationsSearchQuery.push({
          [`translations.${locale}.description`]: new RegExp(targetKeyword, 'i'),
        });
      }
    }

    const postSearchQuery = {
      $and: [
        {
          $or: [
            { title: new RegExp(targetKeyword, 'i') },
            { description: new RegExp(targetKeyword, 'i') },
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
            { name: new RegExp(targetKeyword, 'i') },
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
          const type = meta.type; // Assume meta.type is guaranteed to be defined
          acc[type] = [...(acc[type] || []), meta];
          return acc;
        },
        { actors: [], categories: [], tags: [] },
      )
      : { actors: [], categories: [], tags: [] };

    if (totalCount > 0) {
      await _saveSearchedKeyword(targetKeyword, totalCount);
    }

    cacheTag('cacheItem', `CGetSearch-${targetKeyword}`);

    return successResponse({
      data: {
        posts: JSON.parse(JSON.stringify(posts)),
        totalCount,
        actors: JSON.parse(JSON.stringify(actors)) ,
        categories: JSON.parse(JSON.stringify(categories)) ,
        tags: JSON.parse(JSON.stringify(tags))  ,
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