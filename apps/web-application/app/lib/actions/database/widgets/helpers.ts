import 'server-only'
import getSettings from '@lib/actions/database/settings/getSettings';
import { clientAllowedSortOptions, postFieldRequestForCards } from '@repo/data-structures';
import { metaSchema, postSchema } from '@repo/db';
import { Document } from 'mongoose';
import { ServerActionResponse, unwrapResponse } from '@lib/actions/response';
import { IInitialSettings } from '@repo/typescript-types';

export const findWidgetPosts = async (widgetData: any): Promise<{ posts: {}[]; totalCount: number }> => {
  try {

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const fallbackLimit = initialSettings?.contentSettings?.contentPerPage || 20;

    const metaId = widgetData?.uniqueData?.selectedMetaForPosts || widgetData?.selectedMetaForPosts;
    const postType = widgetData?.uniqueData?.postType || widgetData?.postType;
    const sort = widgetData?.uniqueData?.sort || widgetData?.sort;
    const metaQuery = metaId ? [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
    const postTypeQuery = postType ? [{ postType }] : [];
    const limit = widgetData?.uniqueData?.count || widgetData?.count || fallbackLimit;
    const sortQuery = !sort || sort === 'updatedAt' ? { updatedAt: -1 } : clientAllowedSortOptions.includes(sort) ? { [sort]: -1 } : {};

    const findQuery = {
      $and: [{ status: 'published' }, ...metaQuery, ...postTypeQuery],
    };

    let totalCount = await postSchema.countDocuments(findQuery).exec();
    let posts = await postSchema
      .find(findQuery, ['_id'], {
        //skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : 0,
        skip:  0,
        limit,
        sort: sortQuery,
      })
      .select([...postFieldRequestForCards])
      .lean();

    posts = posts.map((doc) => {
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      return doc;
    });

    return {
      posts,
      totalCount,
    };
  } catch (error) {
    console.log(`findWidgetPosts Error=> `, error);
    return {
      posts: [],
      totalCount: 0,
    };
  }
};

interface IOFindWidgetMetas {
  metaData: {}[],
  totalCount?: number
}

export const findWidgetMetas = async (widgetData: any, withCount?: boolean): Promise<IOFindWidgetMetas> => {
  try {
    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );
    const fallbackLimit = initialSettings?.contentSettings?.contentPerPage || 20;
    const statusQuery = { status: 'published' };
    const type = { type: widgetData?.metaType || widgetData?.uniqueData?.metaType };
    const countQuery = { count: { $gt: 0 } };
    const limit = widgetData?.uniqueData?.count || fallbackLimit;
    const sortQuery =
      widgetData?.sort || widgetData?.uniqueData?.sort
        ? { updatedAt: -1 }
        : {
          rank: 1,
          count: -1,
        };

    const findQuery = { $and: [type, statusQuery, countQuery] };
    const totalCount = withCount ? await metaSchema.countDocuments(findQuery) : 0;
    const metas = await metaSchema
      .find(findQuery, {}, { sort: sortQuery })
      .limit(limit)
      .select('name count imageUrl')
      .lean({
        virtuals: true,
        transform: (doc: Document) => {
          if (doc?._id) {
            doc._id = doc._id.toString();
          }
          return doc;
        },
      });

    return {
      metaData: metas,
      totalCount,
    };
  } catch (err) {
    console.error(err);
    return {
      metaData: [],
    };
  }
};