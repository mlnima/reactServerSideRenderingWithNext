"use strict";
exports.__esModule = true;
//FileSchema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var fileSchema = new Schema({
    usageType: String,
    filePath: {
        type: String,
        required: true
    }
}, { timestamps: true });
var File = mongoose.model("file", fileSchema);
exports["default"] = File;
