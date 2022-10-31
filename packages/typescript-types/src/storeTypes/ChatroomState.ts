import {ChatroomMessage} from "typescript-types";

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