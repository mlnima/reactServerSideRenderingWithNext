const mongoose = require('mongoose');

const widgetSchema = mongoose.Schema({
    data:mongoose.Mixed
});

module.exports = mongoose.model("widgets", widgetSchema);