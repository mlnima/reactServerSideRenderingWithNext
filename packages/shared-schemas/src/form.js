const mongoose = require('mongoose');

const FormSchema = new mongoose.Schema({
    widgetId: mongoose.Schema.Types.ObjectId,
    language: String,
    formName: String,
    data: mongoose.Schema.Types.Mixed
}, {timestamps: true});

module.exports = mongoose.model("form", FormSchema);
