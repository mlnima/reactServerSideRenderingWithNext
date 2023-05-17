import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: Date;
    updatedAt: Date;
    messages: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
    status?: "restricted" | "active" | "archived";
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: Date;
    updatedAt: Date;
    messages: mongoose.Types.ObjectId[];
    users: mongoose.Types.ObjectId[];
    status?: "restricted" | "active" | "archived";
}>>;
export default _default;
//# sourceMappingURL=messengerConversationSchema.d.ts.map