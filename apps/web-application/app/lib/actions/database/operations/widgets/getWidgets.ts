import { connectToDatabase, widgetSchema } from '@repo/db';
import { Widget } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { findWidgetMetas, findWidgetPosts } from '@lib/actions/database/operations/widgets/helpers';

const getWidgets = async (positions: string[], locale: string): Promise<{ [key: string]: [] }> => {
  'use cache';
  await connectToDatabase('getWidgets');
  let result = {};
  const widgets = await widgetSchema
    .find({
      'data.position': { $in: positions },
    })
    .lean({ virtuals: true });

  for await (const widget of widgets) {
    if (widget?._id) {
      widget._id = widget._id.toString();
    }
    if (widget?.data?._id) {
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


// @ts-expect-error: need fix
  result = widgets.reduce((widgetInPositions: Record<string, Widget[]>, widget: Widget) => {
    const position = widget?.data?.position;
    if (!widgetInPositions[position]) {
      widgetInPositions[position] = [];
    }
    widgetInPositions[position].push(widget);
    widgetInPositions[position].sort((a, b) => a.data.widgetIndex - b.data.widgetIndex);

    return widgetInPositions;
  }, {});

  cacheTag('cacheItem', `CWidgets-${positions.join('-')}`);
  return result;
};

export default getWidgets;