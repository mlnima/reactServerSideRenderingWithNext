const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    usageType: String,
    filePath: {
        type: String,
        required: true,
    }

}, {timestamps: true})

module.exports = mongoose.model("file", FileSchema);