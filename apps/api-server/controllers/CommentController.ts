import { Request, Response } from 'express';
import mongoose from 'mongoose';
import commentSchema from '@schemas/commentSchema';
import postSchema from '@schemas/postSchema';
import { mongoIdValidator } from '@util/data-validators';
import { reqQueryToMongooseOptions } from '@util/database-util';
import { multiQueryUniquer } from '@util/queryUtil';

interface RequestCommentData {
    body: string;
    onDocumentId: mongoose.Types.ObjectId;
    author: mongoose.Types.ObjectId;
}

class CommentController {
    static async newComment(req: Request, res: Response) {
        try {

            const commentData = req.body?.commentData as RequestCommentData;

            if (!commentData?.body || !commentData?.onDocumentId || !commentData?.author) {
                res.status(400).json({
                    message: 'Bad Request: Missing required comment data',
                    type: 'error',
                });
                return;
            }

            const commentObject = {
                body: commentData?.body,
                onDocumentId: new mongoose.Types.ObjectId(commentData?.onDocumentId),
                author: new mongoose.Types.ObjectId(commentData?.author),
            };

            const commentObjectToSave = new commentSchema(commentObject);

            const savedComment = await commentObjectToSave.save();

            if (!savedComment) {
                return      res.status(500).json({ message: 'Something Went Wrong' });
            }

            await postSchema
                .findByIdAndUpdate(
                    req.body.onDocumentId,
                    { $push: { comments: [savedComment._id] } },
                    { new: true },
                )
                .exec();

            res.json({ savedComment });
        } catch (error) {
            console.error('Error:', error);
            res.status(500).json({ message: 'Something Went Wrong' });
        }
    }
    static async getComments(req: Request, res: Response) {

        try {
            const onDocument = req.query?.onDocument? multiQueryUniquer(req.query?.onDocument) : '';
            const skip = req.query.skip?  multiQueryUniquer(req.query.skip) : 0;
            const limit = req.query.limit? multiQueryUniquer(req.query.limit) :5;

            if (!onDocument) {
                res.status(400).json({
                    message: 'Bad Request: Missing required document Id',
                    type: 'error',
                });
                return;
            }

            if (mongoIdValidator(onDocument) && onDocument) {
                await commentSchema
                    .find({ onDocumentId : onDocument }, {}, {
                        //@ts-ignore
                            skip,
                            limit,
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
                    .exec()
                    .then(comments => {
                        res.json({ comments });
                    });
            } else {
                res.status(500).json({ message: 'Something Went Wrong' });
            }
        } catch (err) {

            console.log(`err=> `,req.query,err)
            res.status(500).json({ message: 'Something Went Wrong' });
        }
    }
    static async deleteComments(req: Request, res: Response) {
        const { commentsIds } = req.query; // Retrieve commentIds from query parameters

        if (!commentsIds) {
            res.status(400).json({ message: 'No ID provided' });
            return;
        }

        const idsArray = Array.isArray(commentsIds) ? commentsIds : [commentsIds];

        try {
            const deletePromises = idsArray.map(commentId => {
                return commentSchema.findByIdAndDelete(commentId as string, { useFindAndModify: false }).exec();
            });

            await Promise.all(deletePromises);

            res.json({ message: 'Comments Deleted' });
        } catch (error) {
            console.error('Error deleting comments:', error);
            res.status(500).json({ message: 'Something Went Wrong' });
        }
    }
    static async dashboardGetComments(req: Request, res: Response) {
        try {

            const onDocument = req.query.onDocument ? { onDocumentId: req.query.onDocument } : {};

            const keyword = multiQueryUniquer(req.query.keyword)

            const status =
                !req.query.status || req.query.status === 'all'
                    ? { status: 'approved' }
                    : { status: req.query.status };

            const searchQuery = !keyword
                ? {}
                : {
                    $or: [
                        { author: new RegExp(keyword, 'i') },
                        { body: new RegExp(keyword, 'i') },
                        { email: new RegExp(keyword, 'i') },
                    ],
                };

            const comments = await commentSchema
                .find({ $and: [onDocument, status, searchQuery] },{},reqQueryToMongooseOptions(req))
                .populate([
                    { path: 'author', select: { username: 1 } },
                    { path: 'onDocumentId', select: { title: 1, postType: 1 } },
                ])
                .exec();
            const totalCount = await commentSchema
                .countDocuments({ $and: [onDocument, status, searchQuery] })
                .exec();

            res.json({ comments, totalCount });
        } catch (error) {}
    }
}

export default CommentController;
