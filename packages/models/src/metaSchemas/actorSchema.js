"use strict";
exports.__esModule = true;
var mongoose_1 = require("mongoose");
var Schema = mongoose_1["default"].Schema;
var actorSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    description: String,
    status: String,
    imageUrl: String,
    translations: Schema.Types.Mixed,
    count: Number,
    additionalInfo: Schema.Types.Mixed
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("actor", actorSchema);
