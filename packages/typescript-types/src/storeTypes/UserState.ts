import {User} from "../User";

export interface UserState {
    userData?: User ,
    socketId?: string,
    loggedIn: boolean,
    userPageData?: {
        _id:string
    },
    conversations?: { _id: string }[],
    activeConversation?: {
        messages?: {}[],
        users?: User[]
    },
    callData: {
        myVideo?: any,
        partnerVideo?: any,
        callerSignal?: any,
        calling?: boolean,
        receivingCall?: boolean,
        callAccepted?: boolean,
        callerName?: string,
        callerId?: string,
        userStreamData: any
    }
}