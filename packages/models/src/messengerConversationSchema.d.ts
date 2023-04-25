import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    users: mongoose.Types.ObjectId[];
    messages: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    status?: "restricted" | "active" | "archived";
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    users: mongoose.Types.ObjectId[];
    messages: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
    status?: "restricted" | "active" | "archived";
}>>;
export default _default;
//# sourceMappingURL=messengerConversationSchema.d.ts.map