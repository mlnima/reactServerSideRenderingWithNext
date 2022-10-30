import {ChatroomMessage} from "@_typeScriptTypes/Chatroom/ChatroomMessage";

export interface ChatroomState {

    onlineUsers: {
        username:string,
    }[],
    messages: ChatroomMessage[],
    activeVisibleProfile: {
        username: string,
        _id: string,
        profileImage: string,
    }

}