import { User } from "../User";
export interface ChatroomMessage {
    _id: string;
    chatroom: string;
    author: User;
    type: string;
    messageData: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface ChatroomMessageRaw {
    _id: string;
    chatroom: string;
    author: string;
    type: string;
    messageData: string;
    createdAt: string;
    updatedAt: string;
}
//# sourceMappingURL=ChatroomMessage.d.ts.map