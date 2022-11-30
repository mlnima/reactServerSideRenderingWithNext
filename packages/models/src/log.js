"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var LogSchema = new Schema({
    type: {
        type: String,
        url: String,
        "enum": ['log', 'error']
    }
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("log", LogSchema);
