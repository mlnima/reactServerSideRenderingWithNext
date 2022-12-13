import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    translations?: any;
    name?: string;
    type?: string;
    count?: number;
    description?: string;
    index?: number;
    likes?: number;
    status?: string;
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
    name?: string;
    type?: string;
    count?: number;
    description?: string;
    index?: number;
    likes?: number;
    status?: string;
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