const mongoose = require('mongoose');
const Schema = mongoose.Schema

const chatroomSchema = new Schema({
    name:{
        type:String,
        trim:true,
        unique:true
    },
    messages:Array
},{ timestamps: true })

module.exports = mongoose.model("chatroom",chatroomSchema);