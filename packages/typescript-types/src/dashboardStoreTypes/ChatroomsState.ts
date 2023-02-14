import {Chatroom} from "../Chatroom/Chatroom";

export interface ChatroomsState {
    chatrooms: Chatroom[],
    chatroom: Chatroom
}