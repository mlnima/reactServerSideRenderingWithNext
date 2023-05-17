export declare const clientAPIRequestDeleteChatroomMessage: (chatroomId: any, messageId: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestDeleteConversation: (_id: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestFollowUser: (_id: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestGetConversations: (_id: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestGetUserPageData: ({ userWhoRequestIt, username, fields }: {
    userWhoRequestIt?: string;
    username?: string;
    fields?: string[];
}) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestGetUsers: (usersList: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestRegisterUser: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestResetPassword: (data: any) => Promise<import("axios").AxiosResponse<any, any>>;
export declare const clientAPIRequestSendPrivateMessage: (senderId: any, receiverId: any, content: any) => Promise<void>;
export declare const clientAPIRequestUnFollowUser: (_id: any) => Promise<import("axios").AxiosResponse<any, any>>;
//# sourceMappingURL=clientUsers.d.ts.map