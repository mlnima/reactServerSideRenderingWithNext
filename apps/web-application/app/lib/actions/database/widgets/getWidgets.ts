'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { IWidget } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';
import { findWidgetMetas, findWidgetPosts } from '@lib/actions/database/widgets/helpers';

const getWidgets = async (positions: string[], locale: string, cacheLifeDuration: string = 'days'): Promise<{ [key: string]: [] }> => {
  'use cache';

  try {
    await connectToDatabase('getWidgets');

    let result = {};

    let widgets = await widgetSchema
      .find({
        'data.position': { $in: positions },
      })
      .lean<IWidget[]>()
      .exec();

    for (const widget of widgets) {
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

    const transformedWidgets = JSON.parse(JSON.stringify(widgets));

    widgets = null;

    result = transformedWidgets.reduce((widgetInPositions: Record<string, IWidget[]>, widget: IWidget) => {
      const position = widget?.data?.position;
      if (!widgetInPositions[position]) {
        widgetInPositions[position] = [];
      }
      widgetInPositions[position].push(widget);
      widgetInPositions[position].sort((a, b) => a.data.widgetIndex - b.data.widgetIndex);

      return widgetInPositions;
    }, {});

    const cachePositions = positions.map((position) => `CWidgets-${position}`);
    cacheTag('cacheItem', 'CWidgets', ...cachePositions);
    cacheLife(cacheLifeDuration);

    return result;
  } catch (error) {
    console.error(`getWidgets => `, error);

    return {};
  }
};

export default getWidgets;
