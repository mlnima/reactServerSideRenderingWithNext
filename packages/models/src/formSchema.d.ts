import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    data?: any;
    widgetId?: mongoose.Types.ObjectId;
    language?: string;
    formName?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    data?: any;
    widgetId?: mongoose.Types.ObjectId;
    language?: string;
    formName?: string;
}>>;
export default _default;
//# sourceMappingURL=formSchema.d.ts.map