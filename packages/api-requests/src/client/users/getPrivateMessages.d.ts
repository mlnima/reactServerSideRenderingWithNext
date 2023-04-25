interface GetPrivateMessagesParams {
    senderId: string;
    receiverId: string;
    amount?: number;
    skip?: number;
}
declare const getPrivateMessages: ({ senderId, receiverId, amount, skip }: GetPrivateMessagesParams) => Promise<void>;
export default getPrivateMessages;
//# sourceMappingURL=getPrivateMessages.d.ts.map