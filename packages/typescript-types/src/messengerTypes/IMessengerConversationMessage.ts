import {IMessengerConversation} from "./IMessengerConversation";
import {User} from "../User";

export interface IMessengerConversationMessage {
    type: 'privateMessage' | 'eventLog',
    conversation: IMessengerConversation,
    sender: User,
    receiver: User,
    content: string,
    imageContent?:string,
    audioContent?:string,
    isRead: boolean,
    createdAt: Date,
    updatedAt: Date,
}

export interface IMessengerConversationMessageRaw {
    type: string,
    conversation: string,
    sender: string,
    receiver: string,
    content: string,
    imageContent?:string,
    audioContent?:string,
    isRead: boolean,
    createdAt: Date,
    updatedAt: Date,
}