'use cache';
import { connectToDatabase, postSchema, isValidObjectId, metaSchema, flatArrayOdDocumentToObject, flatDocumentToObject } from '@repo/db';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife, unstable_noStore as noStore } from 'next/cache';
import {getSettings} from "@lib/database/operations/settings";
import {metaFieldsRequestForCard} from "@repo/data-structures";
import {Meta} from "@repo/typescript-types";
import {Expression} from "mongoose";

interface IGetMetas {
  locale: string;
  startWith?: string;
  metaType: string;
  page?: number;
  count?: number;
}

interface IOGetMetas {
    metas:[] | null,
    totalCount:number | null,
}

export const getMetas = async ({ locale, startWith, metaType, page = 1, count }: IGetMetas) : Promise<IOGetMetas> => {

  try {
      await connectToDatabase('getMetas')
    const { initialSettings } = await getSettings(['initialSettings']);
    const numberOfCardsPerPage = initialSettings?.contentSettings?.numberOfCardsPerPage || 20 ;

    const notStartWithNumberRegex = /^(?![0-9].*$).*/g;
    const notStartWithAlphabetRegex = /^(?![A-Za-z].*$).*/g;
    const startWithQuery =
        startWith === 'other'
            ? { name: { $regex: notStartWithAlphabetRegex } }
            : !startWith
                ? { name: { $regex: notStartWithNumberRegex } }
                : { name: { $regex: '^' + startWith } };
    const countQuery = { count: { $gt: 0 } };
    let limit = count || numberOfCardsPerPage
    if (metaType === 'tags' && limit > 1000){
        limit = 1000
    }
    if ((metaType === 'categories' || metaType === 'categories') && limit > 80){
        limit = 80
    }
    const type = { type: metaType };
    const statusQuery = { status: 'published' };

    const findQuery = {
      $and: [type, startWithQuery, statusQuery, countQuery],
    }
    const sortQuery = {
        rank: 1,
        updatedAt: -1,
        count: -1,
        createdAt: -1,
    };

    const totalCount = await metaSchema.countDocuments(findQuery).exec();

    let metas = await metaSchema
        .find(
            findQuery,
            null,
            {
              sort: sortQuery,
              limit,
              skip: limit * (page - 1)
            })
        .select([...metaFieldsRequestForCard(metaType,locale),`translations.${locale}.name`],)
        .lean()

      // @ts-expect-error: fix later
      metas = metas.map((doc:Document) => {
          // @ts-expect-error: fix later
          if (doc?._id) {
              // @ts-expect-error: fix later
              doc._id = doc._id.toString();
          }
          return doc;
      });

      return {
          // @ts-expect-error: fix later
          metas,
          totalCount,
      };

  }catch (error){
      console.error(`getPostViews => `, error);
      return {
          metas: null,
          totalCount: null,
      };
  }
};
