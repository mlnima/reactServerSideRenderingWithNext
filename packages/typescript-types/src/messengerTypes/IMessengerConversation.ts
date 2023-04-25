import {User} from "../User";
import {IMessengerConversationMessage} from "./IMessengerConversationMessage";

export interface IMessengerConversation {
    _id: string;
    users: User[],
    messages: IMessengerConversationMessage[],
    status: 'restricted'|'active'| 'archived',
    createdAt: Date,
    updatedAt: Date,
}

export interface IMessengerConversationRaw {
    _id: string;
    users: string[],
    messages: string[],
    status: string,
    createdAt: Date,
    updatedAt: Date,
}