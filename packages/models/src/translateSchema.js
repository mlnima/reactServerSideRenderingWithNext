"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var translateSchema = new mongoose_1.Schema({
    defaultValue: String,
    translate: mongoose_1.Schema.Types.Mixed
});
exports["default"] = mongoose_1["default"].model("translate", translateSchema);
