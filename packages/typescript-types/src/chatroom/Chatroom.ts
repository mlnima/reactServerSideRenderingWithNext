import {ChatroomMessage} from "./ChatroomMessage";

export interface Chatroom{
    _id?:string,
    name:string,
    title:string,
    description:string,
    tags:string,
    messages:ChatroomMessage[]
}

export interface ChatroomRaw{
    _id?:string,
    name:string,
    title:string,
    description:string,
    tags:string,
    messages:string[]
}