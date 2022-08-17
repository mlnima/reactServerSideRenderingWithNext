const mongoose = require('mongoose');
const Schema = mongoose.Schema


const orderSchema =  new Schema({
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
    additionalData:mongoose.Mixed,
    payPalData:{
        type:mongoose.Mixed,
        required:true
    }
})



module.exports = mongoose.model("order", orderSchema);



//plan

