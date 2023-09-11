import {chatroomMessageSchema, chatroomSchema, fileSchema, userSchema} from "models";
import Store from "./store";


const initializeChatroomsToStore = async ()=>{
    const chatrooms = await chatroomSchema.find()
        .select(['name','messages'])
        .populate({
            path: 'messages',
            model: chatroomMessageSchema,
            options: {
                sort: { createdAt: -1 },
                limit: 20
            },
            populate: {
                path: 'author',
                model: userSchema,
                select: 'username profileImage role',
                populate:{
                    path: 'profileImage',
                    model: fileSchema,
                    select: 'filePath',
                }
            }
        })
        .lean()
        .exec();

    Store.setChatroomsList(chatrooms);
}


export default initializeChatroomsToStore;