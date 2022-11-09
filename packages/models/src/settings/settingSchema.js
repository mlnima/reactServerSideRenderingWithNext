"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var settingSchema = new Schema({
    type: {
        type: String,
        unique: true
    },
    data: Schema.Types.Mixed
});
exports["default"] = mongoose_1["default"].model("settings", settingSchema);
