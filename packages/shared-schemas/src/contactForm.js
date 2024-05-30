const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
    userId: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    subject: String,
    description: String,
    date:{
        type:Date,
        default:Date.now()
    }
}, {timestamps: true});

module.exports = mongoose.model("contact",ContactFormSchema);