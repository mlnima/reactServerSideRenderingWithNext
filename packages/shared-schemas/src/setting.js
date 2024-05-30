const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    type: {
        type:String,
        unique:true
    },
    data:mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("settings", SettingSchema);