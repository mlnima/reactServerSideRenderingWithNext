"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importStar(require("mongoose"));
var translateSchema = new mongoose_1.Schema({
    defaultValue: String,
    translate: mongoose_1.Schema.Types.Mixed
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("translate", translateSchema);
