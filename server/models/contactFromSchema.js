const mongoose = require('mongoose');

const contactFormSchema = mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    name: String,
    email: String,
    subject: String,
    description: String,
    date:{
      type:Date,
      default:Date.now()
    }
});

module.exports = mongoose.model("contact",contactFormSchema);