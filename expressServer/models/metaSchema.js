"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//settingSchema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var metaSchema = new Schema({
    name: {
        type: String,
        uppercase: false,
    },
    type: String,
    index: Number,
    description: String,
    status: {
        type: String,
        uppercase: false,
    },
    imageUrl: String,
    coverImageUrl: String,
    imageUrlLock: Boolean,
    rankLock: Boolean,
    translations: mongoose.Mixed,
    count: Number,
    likes: Number,
    views: Number,
    rank: Number,
    additionalInfo: mongoose.Mixed
}, { timestamps: true });
exports.default = mongoose.model("meta", metaSchema);
//# sourceMappingURL=metaSchema.js.map