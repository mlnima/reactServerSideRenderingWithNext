"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require('mongoose');
var formSchema = mongoose.Schema({
    widgetId: mongoose.Schema.Types.ObjectId,
    language: String,
    formName: String,
    data: mongoose.Mixed
}, { timestamps: true });
exports.default = mongoose.model("form", formSchema);
//# sourceMappingURL=formSchema.js.map