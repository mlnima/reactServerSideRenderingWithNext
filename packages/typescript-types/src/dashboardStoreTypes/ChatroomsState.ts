import {IChatroom} from "../chatroom/Chatroom";

export interface ChatroomsState {
    chatrooms: IChatroom[],
    chatroom: IChatroom
}