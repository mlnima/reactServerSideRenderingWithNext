const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    widgetId:mongoose.Types.ObjectId,
    formName:String,
    date:{
        type:Date,
        delete:Date.now()
    },
    data: mongoose.Mixed,
});

module.exports = mongoose.model("form", formSchema);