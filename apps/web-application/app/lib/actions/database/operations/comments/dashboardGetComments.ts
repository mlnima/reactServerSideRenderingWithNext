'use server';
import { verifySession } from '@lib/dal';
import { errorResponse, ServerActionResponse, successResponse, unwrapResponse } from '@lib/actions/response';
import { postStatuses } from '@repo/data-structures';
import { connectToDatabase, commentSchema } from '@repo/db';
import getSettings from '@lib/actions/database/operations/settings/getSettings';
import { IInitialSettings } from '@repo/typescript-types';
import { multiQueryUniquer } from 'api-server/dist/util/queryUtil';
import { reqQueryToMongooseOptions } from 'api-server/dist/util/database-util';

interface IDashboardGetComments {
  keyword?: string,
  status?: string,
  onDocument?: string,
  page?: number,
  size?: number,
  sort?: string
}

const dashboardGetComments = async (
  {
    keyword,
    status,
    onDocument,
    page = 1,
    size,
    sort = '-createdAt',
  }: IDashboardGetComments) => {

  const { isAdmin } = await verifySession();

  if (!isAdmin) {
    return errorResponse({
      message: 'Unauthorized Access',
    });
  }

  await connectToDatabase('dashboardGetMetas');

  const { initialSettings } = unwrapResponse(
    await getSettings(['initialSettings']) as unknown as ServerActionResponse<{
      initialSettings: IInitialSettings | undefined;
    }>,
  );

  const decodedKeyword = keyword ? decodeURIComponent(keyword) : '';


  const statusQuery = status ? [{ status }] : [];


  const searchQuery = !decodedKeyword
    ? []
    : [{ $or: [{ author: new RegExp(decodedKeyword, 'i') }, { email: new RegExp(decodedKeyword, 'i') }, { body: new RegExp(decodedKeyword, 'i') }] }];

  const limit = size || initialSettings?.contentSettings?.contentPerPage || 20;

  const findQuery = { $and: [...searchQuery, ...statusQuery] };


  const comments = await commentSchema
    .find(findQuery, {}, {
      skip: page ? (limit || 20) * (page - 1) : 0,
      limit: size || 20,
      sort: sort || '-updatedAt',
    })
    .populate([
      { path: 'author', select: { username: 1 } },
      { path: 'onDocumentId', select: { title: 1, postType: 1 } },
    ])
    .lean();
  const totalCount = await commentSchema
    .countDocuments(findQuery);

  const transformedComments = comments.map((doc) => ({
    ...doc,
    // @ts-expect-error: its fine
    _id: doc._id.toString(),
    author: {
      ...doc.author,
      _id: doc.author._id.toString(),
    },

  }));

  return successResponse({
    data: {
      comments: transformedComments,
      totalCount,
    },
  });

};

export default dashboardGetComments;