import {ChatroomMessage} from "typescript-types";

export interface ChatroomState {

    onlineUsers: {
        username:string,
    }[],
    messages: ChatroomMessage[],
    isMaximized:boolean,
    activeVisibleProfile: {
        username: string,
        _id: string,
        profileImage: string,
    }

}