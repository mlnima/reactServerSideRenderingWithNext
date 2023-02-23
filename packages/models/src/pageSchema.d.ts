import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string;
    description?: string;
    keywords?: string;
    sidebar?: string;
    status?: string;
    imageUrl?: string;
    translation?: any;
    pageStyle?: string;
    pageName?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    title?: string;
    description?: string;
    keywords?: string;
    sidebar?: string;
    status?: string;
    imageUrl?: string;
    translation?: any;
    pageStyle?: string;
    pageName?: string;
}>>;
export default _default;
//# sourceMappingURL=pageSchema.d.ts.map