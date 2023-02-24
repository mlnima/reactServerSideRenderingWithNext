import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    translations?: any;
    count?: number;
    name?: string;
    description?: string;
    status?: string;
    imageUrl?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    translations?: any;
    count?: number;
    name?: string;
    description?: string;
    status?: string;
    imageUrl?: string;
}>>;
export default _default;
//# sourceMappingURL=categorySchema.d.ts.map