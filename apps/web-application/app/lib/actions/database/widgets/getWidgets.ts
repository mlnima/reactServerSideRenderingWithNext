'use server';
import { connectToDatabase, widgetSchema } from '@repo/db';
import { IWidget } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag, unstable_cacheLife as cacheLife } from 'next/cache';
import { findWidgetMetas, findWidgetPosts } from '@lib/actions/database/widgets/helpers';

const getWidgets = async (
  positions: string[],
  locale: string,
  cacheLifeDuration: string = 'days'
): Promise<{ [key: string]: [] }> => {
  'use cache';
  let connection;
  try {
    connection = await connectToDatabase('getWidgets');

    // Create session for better resource management
    const session = await connection.startSession();

    try {
      let result = {};

      // Execute query with session
      let widgets = await widgetSchema
        .find({
          'data.position': { $in: positions },
        })
        .session(session)
        .lean();

      // Process widgets with session context
      for (const widget of widgets) {
        if (
          widget?.data?.type === 'posts' ||
          widget?.data?.type === 'postsList' ||
          widget?.data?.type === 'postsSlider' ||
          widget?.data?.type === 'postsSwiper'
        ) {
          // Pass session to helper functions if they support it
          const { posts, totalCount } = await findWidgetPosts(widget.data, session);

          widget.data.uniqueData = {
            ...widget.data.uniqueData,
            posts,
            totalCount,
          };
        }

        if (widget?.data?.type === 'meta' || widget?.data?.type === 'metaWithImage') {
          // Pass session to helper functions if they support it
          const { metaData } = await findWidgetMetas(widget.data, session);
          widget.data.uniqueData = {
            ...widget.data.uniqueData,
            metaData,
          };
        }
      }

      // Serialize data efficiently
      const transformedWidgets = JSON.parse(JSON.stringify(widgets));

      // Clean up original widgets reference to prevent memory leaks
      widgets = null;

      // Process transformed widgets
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

    } finally {
      await session.endSession();
    }

  } catch (error) {
    console.error(`getWidgets => `, error);
    // Return empty result structure on error
    return {};
  }
};

export default getWidgets;












// 'use server';
// import { connectToDatabase, widgetSchema } from '@repo/db';
// import { IWidget } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag , unstable_cacheLife as cacheLife } from 'next/cache';
//
// import { findWidgetMetas, findWidgetPosts } from '@lib/actions/database/widgets/helpers';
// // import { deepConvertObjectIdsToStrings } from '@repo/utils-server/dist/src/objects';
//
// const getWidgets = async (
//   positions: string[],
//   locale: string,
//   cacheLifeDuration: string = 'days'
// ): Promise<{ [key: string]: [] }> => {
//   'use cache';
//   await connectToDatabase('getWidgets');
//   let result = {};
//   const widgets = await widgetSchema.find({
//       'data.position': { $in: positions },
//     }).lean();
//
//  // const transformedWidgets = widgets.map((doc) => deepConvertObjectIdsToStrings(doc));
//
//
//   for await (const widget of widgets) {
//     if (
//       widget?.data?.type === 'posts' ||
//       widget?.data?.type === 'postsList' ||
//       widget?.data?.type === 'postsSlider' ||
//       widget?.data?.type === 'postsSwiper'
//     ) {
//       const { posts, totalCount } = await findWidgetPosts(widget.data);
//
//       widget.data.uniqueData = {
//         ...widget.data.uniqueData,
//         posts,
//         totalCount,
//       };
//     }
//
//     if (widget?.data?.type === 'meta' || widget?.data?.type === 'metaWithImage') {
//       const { metaData } = await findWidgetMetas(widget.data);
//       widget.data.uniqueData = {
//         ...widget.data.uniqueData,
//         metaData,
//       };
//     }
//   }
//
//   const transformedWidgets = JSON.parse(JSON.stringify(widgets));
//
//   result = transformedWidgets.reduce((widgetInPositions: Record<string, IWidget[]>, widget: IWidget) => {
//     const position = widget?.data?.position;
//     if (!widgetInPositions[position]) {
//       widgetInPositions[position] = [];
//     }
//     widgetInPositions[position].push(widget);
//     widgetInPositions[position].sort((a, b) => a.data.widgetIndex - b.data.widgetIndex);
//
//     return widgetInPositions;
//   }, {});
//   const cachePositions = positions.map((position) => `CWidgets-${position}`);
//
//   cacheTag('cacheItem', 'CWidgets', ...cachePositions);
//   cacheLife(cacheLifeDuration)
//   return result;
// };
//
// export default getWidgets;




//------------
// 'use server';
// import { connectToDatabase, widgetSchema } from '@repo/db';
// import { IWidget } from '@repo/typescript-types';
// import { unstable_cacheTag as cacheTag , unstable_cacheLife as cacheLife } from 'next/cache';
// import { findWidgetMetas, findWidgetPosts } from '@lib/actions/database/widgets/helpers';
//
// const getWidgets = async (
//   positions: string[],
//   locale: string,
//   cacheLifeDuration: string = 'days'
// ): Promise<{ [key: string]: [] }> => {
//   'use cache';
//   let connection;
//   try {
//
//     connection = await connectToDatabase('getWidgets');
//     const session = await connection.startSession();
//     let result = {};
//
//
//
//
//     const widgets = await widgetSchema.find({
//       'data.position': { $in: positions },
//     }).session(session).lean();
//
//     // const transformedWidgets = widgets.map((doc) => deepConvertObjectIdsToStrings(doc));
//
//
//     for await (const widget of widgets) {
//       if (
//         widget?.data?.type === 'posts' ||
//         widget?.data?.type === 'postsList' ||
//         widget?.data?.type === 'postsSlider' ||
//         widget?.data?.type === 'postsSwiper'
//       ) {
//         const { posts, totalCount } = await findWidgetPosts(widget.data,session);
//
//         widget.data.uniqueData = {
//           ...widget.data.uniqueData,
//           posts,
//           totalCount,
//         };
//       }
//
//       if (widget?.data?.type === 'meta' || widget?.data?.type === 'metaWithImage') {
//         const { metaData } = await findWidgetMetas(widget.data,true,session);
//         widget.data.uniqueData = {
//           ...widget.data.uniqueData,
//           metaData,
//         };
//       }
//     }
//
//     const transformedWidgets = JSON.parse(JSON.stringify(widgets));
//
//     result = transformedWidgets.reduce((widgetInPositions: Record<string, IWidget[]>, widget: IWidget) => {
//       const position = widget?.data?.position;
//       if (!widgetInPositions[position]) {
//         widgetInPositions[position] = [];
//       }
//       widgetInPositions[position].push(widget);
//       widgetInPositions[position].sort((a, b) => a.data.widgetIndex - b.data.widgetIndex);
//
//       return widgetInPositions;
//     }, {});
//     const cachePositions = positions.map((position) => `CWidgets-${position}`);
//
//     cacheTag('cacheItem', 'CWidgets', ...cachePositions);
//     cacheLife(cacheLifeDuration)
//     return result;
//   }catch (error){
//
//   }
//
//
//
//
//
// };
//
// export default getWidgets;