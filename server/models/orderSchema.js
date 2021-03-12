const mongoose = require('mongoose');
const Schema = mongoose.Schema


const orderSchema =  new Schema({
    type:{
        type:String,
        required:true
    },
    buyer:String,
    status:{
        type:String,
        default:'pending'
    },
    shippingAddress:String,
    additionalData:mongoose.Mixed,
    payPalData:{
        type:mongoose.Mixed,
        required:true
    }
})



module.exports = mongoose.model("order", orderSchema);



//plan

