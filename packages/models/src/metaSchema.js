"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var mongoose_1 = tslib_1.__importDefault(require("mongoose"));
var Schema = mongoose_1["default"].Schema;
var metaSchema = new Schema({
    name: {
        type: String,
        uppercase: false
    },
    type: String,
    index: Number,
    description: String,
    status: {
        type: String,
        uppercase: false
    },
    imageUrl: String,
    coverImageUrl: String,
    imageUrlLock: Boolean,
    rankLock: Boolean,
    translations: Schema.Types.Mixed,
    count: Number,
    likes: Number,
    views: Number,
    rank: Number,
    additionalInfo: Schema.Types.Mixed
}, { timestamps: true });
exports["default"] = mongoose_1["default"].model("meta", metaSchema);
