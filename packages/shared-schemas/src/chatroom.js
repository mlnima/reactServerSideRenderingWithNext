const mongoose = require('mongoose');

const ChatroomSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true
    },
    title:String,
    description:String,
    tags:String,
    status:String,
    messages:[{type: mongoose.Schema.Types.ObjectId, ref: 'chatroomMessage'}]
},{ timestamps: true })

module.exports = mongoose.model("chatroom",ChatroomSchema);