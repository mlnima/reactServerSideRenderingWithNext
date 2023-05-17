export declare const clientAPIRequestGetAConversation: ({ conversationId }: {
    conversationId: string;
}) => Promise<void>;
export declare const clientAPIRequestGetConversationsList: ({ limit, skip }: {
    limit?: number;
    skip?: number;
}) => Promise<void>;
export declare const clientAPIRequestLoadOlderMessages: ({ limit, skip, conversationId }: {
    limit: number;
    skip: number;
    conversationId: string;
}) => Promise<void>;
export declare const clientAPIRequestStartAConversation: ({ users }: {
    users: string[];
}) => Promise<void>;
//# sourceMappingURL=clientMessenger.d.ts.map