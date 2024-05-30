const mongoose = require('mongoose');

const ChatroomMessageSchema = new mongoose.Schema({
    chatroom: {type: mongoose.Schema.Types.ObjectId, ref: 'chatroom'},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    image:String,
    type:String,
    messageData:String
},{ timestamps: true });

module.exports = mongoose.model("chatroomMessage",ChatroomMessageSchema);