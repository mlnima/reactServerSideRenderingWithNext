//FileSchema
const mongoose = require('mongoose');
const Schema = mongoose.Schema

const fileSchema = new Schema({
    usageType: String,
    filePath: {
        type: String,
        required: true,
    }

}, {timestamps: true})


const File =  mongoose.model("file", fileSchema);

export default File;