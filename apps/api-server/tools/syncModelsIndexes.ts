import {
    SettingSchema,
    ChatroomSchema,
    CommentSchema,
    ContactFormSchema,
    ConversationSchema,
    FormSchema,
    MetaSchema,
    OrderSchema,
    PageSchema,
    PostSchema,
    SearchKeywordSchema,
    UserSchema,
    WidgetSchema,
    ChatroomMessageSchema,
    FileSchema,
    MessengerConversationMessageSchema,
    MessengerConversationSchema,
    EmailSchema,
} from 'shared-schemas';

const syncAllIndexes = async () => {
    try {
        await SettingSchema.syncIndexes();
        await ChatroomSchema.syncIndexes();
        await CommentSchema.syncIndexes();
        await ContactFormSchema.syncIndexes();
        await ConversationSchema.syncIndexes();
        await FormSchema.syncIndexes();
        await MetaSchema.syncIndexes();
        await OrderSchema.syncIndexes();
        await PageSchema.syncIndexes();
        await PostSchema.syncIndexes();
        await SearchKeywordSchema.syncIndexes();
        await UserSchema.syncIndexes();
        await WidgetSchema.syncIndexes();
        await ChatroomMessageSchema.syncIndexes();
        await FileSchema.syncIndexes();
        await MessengerConversationMessageSchema.syncIndexes();
        await MessengerConversationSchema.syncIndexes();
        await EmailSchema.syncIndexes();
        console.log('All indexes synced successfully.');
    } catch (error) {
        console.error('Error syncing indexes:', error);
    }
};

// Export the sync function so it can be called on startup
export default syncAllIndexes;
