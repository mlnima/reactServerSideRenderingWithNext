'use cache';
import { connectToDatabase, widgetSchema, postSchema, metaSchema,formSchema } from '@repo/db';
import { clientAllowedSortOptions, postFieldRequestForCards } from '@repo/data-structures';
import { Widget } from '@repo/typescript-types';
import { Document } from 'mongoose';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import {getSettings} from "@lib/database/operations/settings";

const findWidgetPosts = async (widgetData: any): Promise<{ posts: {}[]; totalCount: number }> => {
  try {

    const { initialSettings } = await getSettings(['initialSettings']);
    const numberOfCardsPerPage = initialSettings?.contentSettings?.numberOfCardsPerPage || 20 ;

    const metaId = widgetData?.uniqueData?.selectedMetaForPosts || widgetData?.selectedMetaForPosts;
    const postType = widgetData?.uniqueData?.postType || widgetData?.postType;
    const sort = widgetData?.uniqueData?.sort || widgetData?.sort;
    const metaQuery = metaId ? [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
    const postTypeQuery = postType ? [{ postType }] : [];
    const limit = widgetData?.uniqueData?.count || widgetData?.count || numberOfCardsPerPage;
    const sortQuery = !sort || sort === 'updatedAt' ? { updatedAt: -1 } : clientAllowedSortOptions.includes(sort) ? { [sort]: -1 } : {};

    const findQuery = {
      $and: [{ status: 'published' }, ...metaQuery, ...postTypeQuery],
    };

    let totalCount = await postSchema.countDocuments(findQuery).exec();
    let posts = await postSchema
      .find(findQuery, ['_id'], {
        skip: widgetData.sortBy === 'random' ? Math.floor(Math.random() * totalCount) : 0,
        limit,
        sort: sortQuery,
      })
      .select([...postFieldRequestForCards])
      .lean();

    posts = posts.map((doc) => {
      if (doc._id) {
        // @ts-expect-error: check
        doc._id = doc._id.toString();
      }
      return doc;
    });

    return {
      posts,
      totalCount,
    };
  } catch (error) {
    console.log(`findWidgetPosts error=> `, error);
    return {
      posts: [],
      totalCount: 0,
    };
  }
};

interface IOFindWidgetMetas{
  metaData: {}[],
  totalCount?: number
}

const findWidgetMetas = async (widgetData: any, withCount?: boolean): Promise<IOFindWidgetMetas> => {
  try {
    const { initialSettings } = await getSettings(['initialSettings']);
    const numberOfCardsPerPage = initialSettings?.contentSettings?.numberOfCardsPerPage || 20 ;

    const statusQuery = { status: 'published' };
    const type = { type: widgetData?.metaType || widgetData?.uniqueData?.metaType };
    const countQuery = { count: { $gt: 0 } };
    const limit = widgetData?.uniqueData?.count || numberOfCardsPerPage;
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

export const getWidgets = async (positions: string[], locale: string) => {
  await connectToDatabase('getWidgets');
  let result = [];
  const widgets = await widgetSchema
    .find({
      'data.position': { $in: positions },
    })
    .lean({ virtuals: true });

  for await (const widget of widgets) {
    widget._id = widget._id.toString();
    // @ts-expect-error: it's fine
    if (widget?.data?._id) {
      // @ts-expect-error: it's fine
      delete widget.data._id;
    }

    if (
      widget?.data?.type === 'posts' ||
      widget?.data?.type === 'postsList' ||
      widget?.data?.type === 'postsSlider' ||
      widget?.data?.type === 'postsSwiper'
    ) {
      const { posts, totalCount } = await findWidgetPosts(widget.data);

      widget.data.uniqueData = {
        ...widget.data.uniqueData,
        posts,
        totalCount,
      };
    }

    if (widget?.data?.type === 'meta' || widget?.data?.type === 'metaWithImage') {
      const { metaData } = await findWidgetMetas(widget.data);
      widget.data.uniqueData = {
        ...widget.data.uniqueData,
        metaData,
      };
    }
  }

  result = widgets.reduce((widgetInPositions: any, widget: Widget) => {
    if (!widgetInPositions[widget?.data?.position]) {
      widgetInPositions[widget.data.position] = [];
    }
    widgetInPositions[widget.data.position].push(widget);
    return widgetInPositions;
  }, {});

  for (const position in result) {
    result[position].sort((a: Widget, b: Widget) => a.data.widgetIndex - b.data.widgetIndex);
  }
  cacheTag('cacheItem', `CWidgets-${positions.join('-')}`);
  return result;
};

interface ISaveFormWidgetData{
  data : {
    [key: string]: any;
  }
}
export const saveFormWidgetData = async({data}:ISaveFormWidgetData)=>{
  try {
    await connectToDatabase('saveFormWidgetData');
    const formDataDataToSave = new formSchema(data);
    await formDataDataToSave.save()
    return
  }catch (error){
    console.log(`saveFormWidgetData=> `,error)
    return
  }
}