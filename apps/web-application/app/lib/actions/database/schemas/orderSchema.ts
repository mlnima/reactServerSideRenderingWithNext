import mongoose, { Schema, models, model } from "mongoose";

const orderSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        default: 'guest'
    },
    status: {
        type: String,
        default: 'pending'
    },
    additionalData: Schema.Types.Mixed,
    payPalData: {
        type: Schema.Types.Mixed,
        required: true
    }
}, { timestamps: true });

const OrderModel = models?.order || model("order", orderSchema);

export default OrderModel;

// import mongoose from "mongoose";
// const Schema = mongoose.Schema
//
//
// const orderSchema =  new Schema({
//     type:{
//         type:String,
//         required:true
//     },
//     userID:{
//         type:String,
//         default:'guest'
//     },
//     status:{
//         type:String,
//         default:'pending'
//     },
//     additionalData:Schema.Types.Mixed,
//     payPalData:{
//         type:Schema.Types.Mixed,
//         required:true
//     }
// }, {timestamps: true})
//
//
//
// export default mongoose.model("order", orderSchema);
//
//

//plan

