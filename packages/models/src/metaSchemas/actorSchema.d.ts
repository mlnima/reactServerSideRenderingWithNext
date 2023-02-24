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
    additionalInfo?: any;
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
    additionalInfo?: any;
}>>;
export default _default;
//# sourceMappingURL=actorSchema.d.ts.map