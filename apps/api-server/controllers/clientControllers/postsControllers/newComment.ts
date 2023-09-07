import {Request, Response} from 'express';
import {commentSchema, postSchema} from 'models';
import mongoose from "mongoose";

const newComment = async (req: Request, res: Response) => {
    try {
        const commentData = {
            body: req.body.commentData?.body,
            onDocumentId: new mongoose.Types.ObjectId(req.body.commentData?.onDocumentId),
            author: new mongoose.Types.ObjectId(req.body.commentData?.author),
        }

        const commentDataToSave = new commentSchema(commentData);

        const savedComment = await commentDataToSave.save();

        if (!savedComment) {
            return res.status(500).json({message: 'Comment not saved', type: 'error'});
        }

        await postSchema.findByIdAndUpdate(req.body.onDocumentId, {$push: {comments: [savedComment._id]}}, {new: true}).exec();

        res.json({savedComment});

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({message: 'Server Error', type: 'error'});
    }
};

export default newComment;