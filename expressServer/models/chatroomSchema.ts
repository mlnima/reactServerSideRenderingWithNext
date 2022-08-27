import mongoose from 'mongoose';
const Schema = mongoose.Schema

const chatroomSchema = new Schema({
    name:{
        type:String,
        trim:true,
        unique:true
    },
    messages:Array
},{ timestamps: true })

export default mongoose.model("chatroom",chatroomSchema);