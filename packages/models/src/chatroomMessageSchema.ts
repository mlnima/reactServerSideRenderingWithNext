import {model, Schema, Document} from "mongoose";
import {ChatroomMessage} from "typescript-types";

const chatroomMessageSchema = new Schema({
    chatroom: {type: Schema.Types.ObjectId, ref: 'chatroom'},
    author: {type: Schema.Types.ObjectId, ref: 'user'},
    image:String,
    type:String,
    messageData:String
},{ timestamps: true });

export default model<ChatroomMessage & Document>("chatroomMessage",chatroomMessageSchema);