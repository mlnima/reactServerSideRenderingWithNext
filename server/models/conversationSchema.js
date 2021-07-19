let mongoose = require('mongoose');
const Schema = mongoose.Schema

const systemMessage = mongoose.Schema({
    message:String,
    type:String,
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

const messageSchema = mongoose.Schema({
    messageBody:String,
    author:{type:Schema.Types.ObjectID,ref:'user'},
    createdAt:{
        type: Date,
        default:Date.now()
    }
})

const conversationSchema = mongoose.Schema({
    users: [{type:Schema.Types.ObjectID,ref:'user'}],
    messages:[messageSchema],
    systemMessages:[systemMessage]
},{ timestamps: true })

module.exports = mongoose.model("conversation",conversationSchema)