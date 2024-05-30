const mongoose = require('mongoose');

const OrderSchema =  new mongoose.Schema({
    type:{
        type:String,
        required:true
    },
    userID:{
        type:String,
        default:'guest'
    },
    status:{
        type:String,
        default:'pending'
    },
    additionalData:mongoose.Schema.Types.Mixed,
    payPalData:{
        type:mongoose.Schema.Types.Mixed,
        required:true
    }
}, {timestamps: true})



module.exports = mongoose.model("order", OrderSchema);