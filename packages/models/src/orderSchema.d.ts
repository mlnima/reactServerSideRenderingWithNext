import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    userID: string;
    status: string;
    payPalData: any;
    additionalData?: any;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    type: string;
    userID: string;
    status: string;
    payPalData: any;
    additionalData?: any;
}>>;
export default _default;
//# sourceMappingURL=orderSchema.d.ts.map