'use server';
import { IDeleteComments, IGetComments, INewComment } from '@lib/database/operations/types';
import { commentSchema, connectToDatabase } from '@repo/db';
import { isValidObjectId } from '@repo/db';
import { Comment } from '@repo/typescript-types';
import { unstable_cacheTag as cacheTag } from 'next/cache';
import mongoose from 'mongoose';

export const getComments = async ({
                                    onDocument,
                                    skip = 0,
                                    limit = 5,
                                  }: IGetComments) => {
  'use cache';
  try {
    await connectToDatabase('getComments');

    const isId = isValidObjectId(onDocument);
    if (!onDocument || !isId) return null;

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
      .lean<Comment[]>();

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

    cacheTag(
      'cacheItem',
      `CComments-${onDocument}-${skip}-${limit}`,
      `CComments-${onDocument}`,
    );
    // cacheLife('seconds');
    // noStore()
    return comments;
  } catch (error) {
    console.error(`getComments => `, error);
    return [];
  }
};

// NEED TO BE TESTED FOR SPAM COMMENTS
export const newComment = async ({ commentData }: INewComment) => {
  try {
    if (
      !commentData?.body ||
      !commentData?.onDocumentId ||
      !commentData?.author
    )
      return null;
    await connectToDatabase('newComment');
    const commentObject = {
      body: commentData?.body,
      onDocumentId: new mongoose.Types.ObjectId(commentData?.onDocumentId),
      author: new mongoose.Types.ObjectId(commentData?.author),
    };

    const commentObjectToSave = new commentSchema(commentObject);
    const savedComment = await commentObjectToSave.save();
    if (!savedComment) {
      return null;
    }

    return savedComment._id.toString();
  } catch (error) {
    console.log(`New Comment Error=> `, error);
    return null;
  }
};

export const deleteComments = async ({ ids }: IDeleteComments) => {
  try {
    if (!ids) return null;
    const deletePromises = ids.map((commentId) => {
      return commentSchema
        .findByIdAndDelete(commentId as string, { useFindAndModify: false })
        .exec();
    });

    await Promise.all(deletePromises);
    return true;
  } catch (error) {
    console.log(`deleteComments=> `, error);
    return null;
  }
};

