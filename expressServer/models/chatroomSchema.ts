import {model, Schema, Document} from "mongoose";
import {Chatroom} from "../../_typeScriptTypes/Chatroom/Chatroom";

const chatroomSchema = new Schema({
    name:{
        type:String,
        trim:true,
        unique:true
    },
    messages:Array
},{ timestamps: true })

export default model<Chatroom & Document>("chatroom",chatroomSchema);