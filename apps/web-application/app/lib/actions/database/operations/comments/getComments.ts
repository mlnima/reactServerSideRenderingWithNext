'use server';
import { IGetComments } from '@lib/actions/database/operations/types';
import { commentSchema, connectToDatabase } from '@repo/db';
import { isValidObjectId } from '@repo/db';
import { IComment } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import { errorResponse, ServerActionResponse, successResponse } from '@lib/actions/response';

const getComments = async (
  {
    onDocument,
    skip = 0,
    limit = 5,
  }: IGetComments): Promise<ServerActionResponse<{ comments: IComment[] } | null>> => {
  // 'use cache';
  try {
    await connectToDatabase('getComments');

    const isId = isValidObjectId(onDocument);
    if (!onDocument || !isId) {
      return errorResponse({
        message: 'Something went wrong please try again later',
      });
    }

    let comments = await commentSchema
      .find(
        { onDocumentId: onDocument },
        {},
        {
          skip,
          limit,
          sort: '-createdAt',
        },
      )
      .populate([
        {
          path: 'author',
          select: ['username', 'profileImage'],
          populate: {
            path: 'profileImage',
            model: 'file',
          },
        },
      ])
      .lean<IComment[]>();

    comments = comments.map((doc) => {
      if (doc._id) {
        doc._id = doc._id.toString();
      }
      if (doc.onDocumentId) {
        doc.onDocumentId = doc.onDocumentId.toString();
      }
      if (doc?.author?._id) {
        doc.author._id = doc.author._id.toString();
      }
      if (doc?.author?.profileImage?._id) {
        doc.author.profileImage._id = doc.author.profileImage._id.toString();
      }
      return doc;
    });

    // cacheTag(
    //   'cacheItem',
    //   `CComments-${onDocument}-${skip}-${limit}`,
    //   `CComments-${onDocument}`,
    // );

    return successResponse({
      data: {
        comments,
      },
    });
  } catch (error) {
    console.error(`getComments => `, error);
    return errorResponse({
      message: 'Something went wrong please try again later',
    });
  }
};

export default getComments;