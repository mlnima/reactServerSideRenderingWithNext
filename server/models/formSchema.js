const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    widgetId:mongoose.Types.ObjectId,
    formName:String,
    data: mongoose.Mixed
},{ timestamps: true });

module.exports = mongoose.model("form", formSchema);