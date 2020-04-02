//commentSchema
const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    onDocument: mongoose.Types.ObjectId,
    author: mongoose.Mixed,
    email:String,
    body: String,
    postedDate:{
        type:Date,
        default:Date.now()
    },
    status:{
        type:String,
        default: 'pending'
    }
});

module.exports = mongoose.model("comments",commentSchema);