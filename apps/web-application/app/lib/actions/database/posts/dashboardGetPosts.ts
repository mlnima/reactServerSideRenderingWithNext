'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { connectToDatabase, postSchema } from '@repo/db';
import getSettings from '@lib/actions/database/settings/getSettings';
import { Types } from 'mongoose';
import { postStatuses } from '@repo/data-structures';
import { IInitialSettings } from '@repo/typescript-types';

const dashboardGetPosts = async ({ metaId, keyword, status, postType, page, size, sort }: any) => {
  try {

    // const { isAdmin } = await verifySession();
    //
    // if (!isAdmin) {
    //   return errorResponse({
    //     message: 'Unauthorized Access',
    //   });
    // }

    await connectToDatabase('dashboardGetPosts');

    const { initialSettings } = unwrapResponse(
      await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
        initialSettings: IInitialSettings | undefined;
      }>,
    );

    const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;

    const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';
    const metaQuery = metaId ?
      [{ $or: [{ categories: { $in: metaId } }, { tags: { $in: metaId } }, { actors: { $in: metaId } }] }] : [];
    const searchQuery = !decodedKeyword ? [] : [{
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
    }];

    const statusQuery = !status
      ? [{ status: 'published' }]
      : status === 'all'
        ? [{ status: { $ne: 'trash' } }]
        : [{ status: status }];

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

    const posts = await postSchema.find(
      findQuery,
      null,
      {
        skip: page ? (limit || 20) * (page - 1) : 0,
        limit: size || 20,
        sort: sort || '-updatedAt',
      },
    ).populate(populateOptions).lean();


    // const transformedPosts = posts.map((doc) => ({
    //   ...doc,
    //
    //   _id: doc._id.toString(),
    //   author: doc?.author ? {
    //     ...doc?.author,
    //     _id: doc?.author?._id.toString(),
    //   } : null,
    //   thumbnail: doc?.thumbnail ? {
    //     ...doc?.thumbnail,
    //     _id: doc?.thumbnail?._id.toString(),
    //   } : null,
    //   tags: (doc?.tags || []).map((meta: { _id: Types.ObjectId }) => ({
    //     ...meta,
    //     _id: meta._id.toString(),
    //   })),
    //   categories: (doc?.categories || []).map((meta: { _id: Types.ObjectId }) => ({
    //     ...meta,
    //     _id: meta._id.toString(),
    //   })),
    //   actors: (doc?.actors || []).map((meta: { _id: Types.ObjectId }) => ({
    //     ...meta,
    //     _id: meta._id.toString(),
    //   })),
    // }));

    let statusesCount = postStatuses.reduce((final: { [key: string]: number }, current: string) => {
      final[current] = 0;
      return final;
    }, {});

    for await (const status of postStatuses) {
      statusesCount[status] = await postSchema.countDocuments({ status }).lean();
    }

    return successResponse({
      data: {
        posts: JSON.parse(JSON.stringify(posts)),
        totalCount,
        statusesCount,
      },
    });

  } catch (error) {

    console.log(`error=> `, error);

    return errorResponse({
      message: 'Something went wrong',
      error,
    });

  }
};

export default dashboardGetPosts;