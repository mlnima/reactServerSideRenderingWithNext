//commentSchema
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    onDocumentId: mongoose.Types.ObjectId,
    onDocumentTitle: String,
    author: String,
    authorID:mongoose.Types.ObjectId,
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