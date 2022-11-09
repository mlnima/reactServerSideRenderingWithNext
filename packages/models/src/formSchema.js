"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var formSchema = new Schema({
    widgetId: Schema.Types.ObjectId,
    language: String,
    formName: String,
    data: Schema.Types.Mixed
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("form", formSchema);
