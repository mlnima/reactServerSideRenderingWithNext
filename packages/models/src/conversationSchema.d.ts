import mongoose from "mongoose";
declare const _default: mongoose.Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    messages: mongoose.Types.DocumentArray<{
        createdAt: Date;
        author?: mongoose.Types.ObjectId;
        messageBody?: string;
    }>;
    users: mongoose.Types.ObjectId[];
    systemMessages: mongoose.Types.DocumentArray<{
        createdAt: Date;
        type?: string;
        message?: string;
    }>;
}, {}, {}, {}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.ResolveSchemaOptions<{
    timestamps: true;
}>, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    messages: mongoose.Types.DocumentArray<{
        createdAt: Date;
        author?: mongoose.Types.ObjectId;
        messageBody?: string;
    }>;
    users: mongoose.Types.ObjectId[];
    systemMessages: mongoose.Types.DocumentArray<{
        createdAt: Date;
        type?: string;
        message?: string;
    }>;
}>>;
export default _default;
//# sourceMappingURL=conversationSchema.d.ts.map