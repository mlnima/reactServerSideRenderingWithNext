"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var pageSchema = new Schema({
    pageName: {
        type: String,
        unique: true
    },
    title: String,
    description: String,
    keywords: String,
    sidebar: String,
    status: String,
    imageUrl: String,
    translation: Schema.Types.Mixed,
    pageStyle: String
});
exports["default"] = mongoose_1["default"].model("page", pageSchema);
