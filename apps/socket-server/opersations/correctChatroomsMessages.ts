import {ChatroomMessageSchema, ChatroomSchema} from "shared-schemas";

export const correctChatroomsMessages = async () =>{

    const allMessages = await ChatroomMessageSchema.find();

    for (let message of allMessages) {
        // Check if the message has a chatroom ID
        if (!message.chatroom) {
            // Remove the message if it has no chatroom ID
            await ChatroomMessageSchema.findByIdAndRemove(message._id);
            console.log('message ',message._id, ' removed')
        } else {
            // Add the message ID to the chatroom's messages array
            await ChatroomSchema.findByIdAndUpdate(
                message.chatroom,
                {
                    $addToSet: { messages: message._id }
                }
            );
            console.log('message ',message._id, ' updated')
        }
    }
}
