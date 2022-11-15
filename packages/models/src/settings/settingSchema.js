"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var settingSchema = new Schema({
    type: {
        type: String,
        unique: true
    },
    data: Schema.Types.Mixed
});
exports["default"] = mongoose_1["default"].model("settings", settingSchema);
