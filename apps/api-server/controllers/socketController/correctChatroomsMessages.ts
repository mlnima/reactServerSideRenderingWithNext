import chatroomMessageSchema from "@schemas/chatroomMessageSchema";
import chatroomSchema from "@schemas/chatroomSchema";

export const correctChatroomsMessages = async () =>{

    const allMessages = await chatroomMessageSchema.find();

    for (let message of allMessages) {
        // Check if the message has a chatroom ID
        if (!message.chatroom) {
            // Remove the message if it has no chatroom ID
            await chatroomMessageSchema.findByIdAndRemove(message._id);
            console.log('message ',message._id, ' removed')
        } else {
            // Add the message ID to the chatroom's messages array
            await chatroomSchema.findByIdAndUpdate(
                message.chatroom,
                {
                    $addToSet: { messages: message._id }
                }
            );
            console.log('message ',message._id, ' updated')
        }
    }
}
