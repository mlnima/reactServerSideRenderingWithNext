//settingSchema
const mongoose = require('mongoose');

const settingSchema = mongoose.Schema({
    type: {
        type:String,
        unique:true
    },
    data: mongoose.Mixed
});

module.exports = mongoose.model("settings", settingSchema);