import { Schema, models, model, Model } from 'mongoose';

const orderSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      default: 'guest',
    },
    status: {
      type: String,
      default: 'pending',
    },
    additionalData: Schema.Types.Mixed,
    payPalData: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

const OrderModel = (models?.order || model('order', orderSchema)) as Model<any>;

export default OrderModel;
