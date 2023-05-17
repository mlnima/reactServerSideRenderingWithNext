import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: Date;
    updatedAt: Date;
    conversation: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
    type?: "privateMessage" | "eventLog";
    imageContent?: string;
    audioContent?: string;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    createdAt: Date;
    updatedAt: Date;
    conversation: mongoose.Types.ObjectId;
    sender: mongoose.Types.ObjectId;
    content: string;
    isRead: boolean;
    type?: "privateMessage" | "eventLog";
    imageContent?: string;
    audioContent?: string;
}>>;
export default _default;
//# sourceMappingURL=messengerConversationMessageSchema.d.ts.map