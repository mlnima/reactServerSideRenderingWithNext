const mongoose = require('mongoose');

const formSchema = mongoose.Schema({
    widgetId:mongoose.Schema.Types.ObjectId,
    language:String,
    formName:String,
    data: mongoose.Mixed
},{ timestamps: true });

export default mongoose.model("form", formSchema);