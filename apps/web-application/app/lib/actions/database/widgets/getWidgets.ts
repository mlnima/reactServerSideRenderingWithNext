'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { IWidget } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { findWidgetMetas, findWidgetPosts } from '@lib/actions/database/widgets/helpers';
// import { deepConvertObjectIdsToStrings } from '@repo/utils-server/dist/src/objects';

const getWidgets = async (positions: string[], locale: string): Promise<{ [key: string]: [] }> => {
  'use cache';
  await connectToDatabase('getWidgets');
  let result = {};
  const widgets = await widgetSchema.find({
      'data.position': { $in: positions },
    }).lean();

 // const transformedWidgets = widgets.map((doc) => deepConvertObjectIdsToStrings(doc));


  for await (const widget of widgets) {
    // if (widget?._id) {
    //   widget._id = widget._id.toString();
    // }
    // if (widget?.data?._id) {
    //   delete widget.data._id;
    // }

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
  return result;
};

export default getWidgets;