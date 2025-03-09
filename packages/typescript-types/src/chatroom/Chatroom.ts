import {ChatroomMessage} from "./ChatroomMessage";

export interface IChatroom{
    _id:string,
    name:string,
    title:string,
    description:string,
    tags:string,
    messages:ChatroomMessage[]
}