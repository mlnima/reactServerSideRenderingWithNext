import {Chatroom} from "../chatroom/Chatroom";

export interface ChatroomsState {
    chatrooms: Chatroom[],
    chatroom: Chatroom
}