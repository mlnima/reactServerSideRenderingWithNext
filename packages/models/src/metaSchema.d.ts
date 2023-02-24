import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    translations?: any;
    type?: string;
    count?: number;
    name?: string;
    description?: string;
    index?: number;
    status?: string;
    likes?: number;
    imageUrl?: string;
    coverImageUrl?: string;
    imageUrlLock?: boolean;
    rankLock?: boolean;
    views?: number;
    rank?: number;
    additionalInfo?: any;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    translations?: any;
    type?: string;
    count?: number;
    name?: string;
    description?: string;
    index?: number;
    status?: string;
    likes?: number;
    imageUrl?: string;
    coverImageUrl?: string;
    imageUrlLock?: boolean;
    rankLock?: boolean;
    views?: number;
    rank?: number;
    additionalInfo?: any;
}>>;
export default _default;
//# sourceMappingURL=metaSchema.d.ts.map