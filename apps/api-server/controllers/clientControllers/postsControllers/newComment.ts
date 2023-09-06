import { Request, Response } from 'express';
import { commentSchema, postSchema } from 'models';

const newComment = async (req: Request, res: Response) => {
    try {
        const commentDataToSave = new commentSchema(req.body);
        const savedComment = await commentDataToSave.save();

        if (!savedComment) {
            return res.status(500).json({ message: 'Comment not saved', type: 'error' });
        }

        await postSchema.findByIdAndUpdate(req.body.onDocumentId, { $push: { comments: [savedComment._id] } }, { new: true }).exec();

        res.json({ savedComment });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Server Error', type: 'error' });
    }
};

export default newComment;