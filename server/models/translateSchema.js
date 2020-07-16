const mongoose = require('mongoose');
const Schema = mongoose.Schema

const translateSchema =  new Schema({
     defaultValue:String,
     translate: Schema.Types.Object
});

module.exports = mongoose.model("translate", translateSchema);