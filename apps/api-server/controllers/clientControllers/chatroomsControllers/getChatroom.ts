import { Request, Response } from 'express';
import { ChatroomSchema } from 'shared-schemas';
import { mongoIdValidator } from 'custom-server-util';

interface GetChatroomQuery {
    identifier: string;
}

const getChatroom = async (req: Request<{}, {}, {}, GetChatroomQuery>, res: Response): Promise<void> => {
    try {
        const isValidId = mongoIdValidator(req.query.identifier);
        const currentChatroom = await ChatroomSchema.findOne(
            isValidId ? { _id: req.query.identifier } : { name: req.query.identifier }
        ).exec();
        const allTheChatrooms = await ChatroomSchema.find({}).select('name').exec();

        res.json({ chatroom: currentChatroom, chatrooms: allTheChatrooms });
    } catch (error) {
        console.error('Error fetching chatrooms:', error);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

export default getChatroom;