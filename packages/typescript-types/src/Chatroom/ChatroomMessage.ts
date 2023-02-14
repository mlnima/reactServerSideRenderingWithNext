import {Chatroom} from "./Chatroom";
import {User} from "../User";

export interface ChatroomMessage{
    chatroom: Chatroom,
    author: User,
    type:string,
    messageData:string,
    createdAt:Date,
    updatedAt:Date,
}

export interface ChatroomMessageRaw{
    chatroom: string,
    author: string,
    type:string,
    messageData:string,
    createdAt:string,
    updatedAt:string,
}