import Store from './store';
import chatroomSchema from '@schemas/chatroomSchema';
import chatroomMessageSchema from '@schemas/chatroomMessageSchema';
import userSchema from '@schemas/userSchema';
import fileSchema from '@schemas/fileSchema';

const initializeChatroomsToStore = async () => {
    try {
        const chatrooms = await chatroomSchema
            .find({})
            .select(['name', 'messages'])
            .populate({
                path: 'messages',
                model: chatroomMessageSchema,
                options: {
                    sort: { createdAt: -1 },
                    limit: 20,
                },
                populate: {
                    path: 'author',
                    model: userSchema,
                    select: 'username profileImage role',
                    populate: {
                        path: 'profileImage',
                        model: fileSchema,
                        select: 'filePath',
                    },
                },
            })
            .exec();

        Store.setChatroomsList(chatrooms);
    } catch (error) {
        console.log(`initializeChatroomsToStore Error=> `, error);
    }
};

export default initializeChatroomsToStore;
