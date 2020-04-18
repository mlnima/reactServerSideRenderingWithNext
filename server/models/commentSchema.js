//commentSchema
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    onDocument: mongoose.Types.ObjectId,
    author: String,
    authorID:mongoose.ObjectId,
    email:String,
    body: String,
    postedDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default: 'approved'
    }
});

module.exports = mongoose.model("comments",commentSchema);