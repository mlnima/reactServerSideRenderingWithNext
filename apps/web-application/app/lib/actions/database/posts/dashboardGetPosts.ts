'use server';
import { errorResponse, successResponse } from '@lib/actions/response';
import { connectToDatabase, postSchema } from '@repo/db';

import { postStatuses } from '@repo/data-structures';

const dashboardGetPosts = async ({ metaId, keyword, status, postType, page, size = 20, sort }: any) => {
  try {
    await connectToDatabase('dashboardGetPosts');
    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
    const metaQuery = metaId ? [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
    const searchQuery = !decodedKeyword
      ? []
      : [
          {
            $or: [
              { title: new RegExp(decodedKeyword, 'i') },
              { description: new RegExp(decodedKeyword, 'i') },
              { mainThumbnail: new RegExp(decodedKeyword, 'i') },
              { videoTrailerUrl: new RegExp(decodedKeyword, 'i') },
              { videoUrl: new RegExp(decodedKeyword, 'i') },
              { downloadLink: new RegExp(decodedKeyword, 'i') },
              { iframe: new RegExp(decodedKeyword, 'i') },
              { videoEmbedCode: new RegExp(decodedKeyword, 'i') },
              { videoScriptCode: new RegExp(decodedKeyword, 'i') },
            ],
          },
        ];

    const statusQuery = !status ? [{ status: 'published' }] : status === 'all' ? [{ status: { $ne: 'trash' } }] : [{ status: status }];

    const postTypeQuery = postType && postType !== 'all' ? [{ postType }] : [];

    const findQuery = { $and: [...metaQuery, ...searchQuery, ...statusQuery, ...postTypeQuery] };

    const populateOptions = [
      { path: 'author', select: ['username', 'role'] },
      { path: 'actors', select: { name: 1, type: 1 } },
      { path: 'categories', select: { name: 1, type: 1 } },
      { path: 'tags', select: { name: 1, type: 1 } },
      { path: 'thumbnail', select: { filePath: 1 } },
    ];

    const totalCount = await postSchema.countDocuments(findQuery).exec();

    let posts = await postSchema
      .find(findQuery, null, {
        skip: page ? size * (page - 1) : 0,
        limit: size,
        sort: sort || '-updatedAt',
      })
      .populate(populateOptions)
      .lean()
      .exec();

    let statusesCount = postStatuses.reduce((final: { [key: string]: number }, current: string) => {
      final[current] = 0;
      return final;
    }, {});

    for await (const status of postStatuses) {
      statusesCount[status] = await postSchema.countDocuments({ status }).lean().exec();
    }

    const serializedData = {
      posts: JSON.parse(JSON.stringify(posts)),
      totalCount,
      statusesCount,
    };

    posts = null;

    return successResponse({
      data: serializedData,
    });
  } catch (error) {
    console.log(`dashboardGetPosts Error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });
  }
};

export default dashboardGetPosts;
