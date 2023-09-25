import {
    settingSchema,
    chatroomSchema,
    commentSchema,
    contactFromSchema,
    conversationSchema,
    formSchema,
    metaSchema,
    orderSchema,
    pageSchema,
    postSchema,
    searchKeywordSchema,
    translateSchema,
    userSchema,
    widgetSchema,
    chatroomMessageSchema,
    fileSchema,
    messengerConversationMessageSchema,
    messengerConversationSchema,
    emailSchema,
} from 'models';

const syncAllIndexes = async () => {
    try {
        await settingSchema.syncIndexes();
        await chatroomSchema.syncIndexes();
        await commentSchema.syncIndexes();
        await contactFromSchema.syncIndexes();
        await conversationSchema.syncIndexes();
        await formSchema.syncIndexes();
        await metaSchema.syncIndexes();
        await orderSchema.syncIndexes();
        await pageSchema.syncIndexes();
        await postSchema.syncIndexes();
        await searchKeywordSchema.syncIndexes();
        await translateSchema.syncIndexes();
        await userSchema.syncIndexes();
        await widgetSchema.syncIndexes();
        await chatroomMessageSchema.syncIndexes();
        await fileSchema.syncIndexes();
        await messengerConversationMessageSchema.syncIndexes();
        await messengerConversationSchema.syncIndexes();
        await emailSchema.syncIndexes();
        console.log('All indexes synced successfully.');
    } catch (error) {
        console.error('Error syncing indexes:', error);
    }
};

// Export the sync function so it can be called on startup
export default syncAllIndexes;
