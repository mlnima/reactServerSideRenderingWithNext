import {ChatroomMessageSchema, ChatroomSchema, FileSchema, UserSchema} from "shared-schemas";
import Store from "./store";


const initializeChatroomsToStore = async ()=>{
    const chatrooms = await ChatroomSchema.find()
        .select(['name','messages'])
        .populate({
            path: 'messages',
            model: ChatroomMessageSchema,
            options: {
                sort: { createdAt: -1 },
                limit: 20
            },
            populate: {
                path: 'author',
                model: UserSchema,
                select: 'username profileImage role',
                populate:{
                    path: 'profileImage',
                    model: FileSchema,
                    select: 'filePath',
                }
            }
        })
        .lean()
        .exec();

    Store.setChatroomsList(chatrooms);
}


export default initializeChatroomsToStore;