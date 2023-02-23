"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
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
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("page", pageSchema);
