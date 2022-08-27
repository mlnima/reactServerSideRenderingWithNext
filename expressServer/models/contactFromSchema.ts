const mongoose = require('mongoose');

const contactFormSchema = mongoose.Schema({
    userId:mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    subject: String,
    description: String,
    date:{
      type:Date,
      default:Date.now()
    }
});

export default mongoose.model("contact",contactFormSchema);