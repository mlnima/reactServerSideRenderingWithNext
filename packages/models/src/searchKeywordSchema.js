"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var metaSchema = new Schema({
    name: {
        type: String,
        uppercase: false,
        unique: true
    },
    description: String,
    count: Number
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("searchKeyword", metaSchema);
