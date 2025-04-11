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
  if (!keyword) return;
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
    console.log('error=> ', error);
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
  // 'use cache';

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

    posts = posts.map((doc) => {
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    });

    const totalCount = returnTotalCount ? await postSchema.countDocuments(postSearchQuery) : 0;
    let metas = returnMetas ? await metaSchema
      .find(metasSearchQuery, {}, { sort })
      .limit(size)
      .lean<IMeta[]>() : [];


    if (returnMetas) {
      metas = metas.map((doc) => {
        if (doc?._id) {
          doc._id = doc._id.toString();
        }
        return doc;
      });
    }


    const { actors, categories, tags } = returnMetas ? (metas || []).reduce(
      (acc: { [key: string]: IMeta[] }, meta: IMeta) => {
        acc[meta?.type] = [...(acc?.[meta?.type] || []), meta];

        return acc;
      },
      { actors: [], categories: [], tags: [] },
    ) : { actors: [], categories: [], tags: [] };

    if (totalCount > 0) {
      await _saveSearchedKeyword(targetKeyword, totalCount);
    }
    // cacheTag('cacheItem', `CGetSearch-${targetKeyword}`);

    return successResponse({
      data: {
        posts: posts as IPost[],
        totalCount,
        actors: actors as IMeta[],
        categories: categories as IMeta[],
        tags: tags as IMeta[],
      },
    });


  } catch (error) {
    console.error(`error=> `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }

};

export default getSearch;