'use server';
import { connectToDatabase, metaSchema, postSchema, searchKeywordSchema } from '@repo/db';
import { getDefaultLocale, getLocales } from '@repo/utils';
import { postFieldRequestForCards } from '@repo/data-structures';
import { Document } from 'mongoose';
import { Meta } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import {IGetSearch} from './types'

const saveSearchedKeyword = async (keyword: string, postsCount: number) => {
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
      )
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
  }: IGetSearch) => {
  'use cache';
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

  let posts = await postSchema
    .find(postSearchQuery, postFieldRequestForCards, {
      limit: size,
      skip: size * page - size,
      sort,
    })
    .select([...postFieldRequestForCards, `translations.${locale}.title`])
    .lean();

  posts = posts.map((doc) => {
    if (doc._id) {
      doc._id = doc._id.toString();
    }
    return doc;
  });

  const totalCount = await postSchema.countDocuments(postSearchQuery);
  let metas = await metaSchema
    .find(metasSearchQuery, {}, { sort })
    .limit(size)
    .lean();

  metas = metas.map((doc: Document) => {
    if (doc?._id) {
      doc._id = doc._id.toString();
    }
    return doc;
  });

  const { actors, categories, tags } = (metas || []).reduce(
    (acc: { [key: string]: Meta[] }, meta: Meta) => {
      acc[meta?.type] = [...(acc?.[meta?.type] || []), meta];

      return acc;
    },
    { actors: [], categories: [], tags: [] },
  );

  if (totalCount > 0) {
    await saveSearchedKeyword(targetKeyword, totalCount);
  }
  cacheTag('cacheItem', `CGetSearch-${targetKeyword}`);
  return {
    posts,
    totalCount,
    actors,
    categories,
    tags,
  };
};

export const getSearchSuggestion = async (userInput: string) => {
  'use cache';
  try {
    await connectToDatabase('getSearchSuggestion');
    if (!userInput) {
      return null;
    }

    const regex = new RegExp(`^${userInput}`, 'i');
    let suggestions = await searchKeywordSchema.find(
      { name: regex },
      {
        name: 1,
        count: 1,
      },
    ).lean();
    console.log(`suggestions=> `,suggestions)
    suggestions = suggestions.map(keyword => {
      keyword._id = keyword._id.toString();
      return keyword;
    });
    cacheTag('cacheItem', `CGetSearchSuggestion-${userInput}`);
    return suggestions;
  } catch (error) {
    return null;
  }
};
