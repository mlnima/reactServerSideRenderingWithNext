import {User} from "../User";
import {IFile} from "../IFile";

export interface UserState {
    userData?: User ,
    socketId?: string,
    loggedIn: boolean,
    userPageData?: {
        isFollowed: Boolean;
        isBlocked: Boolean;
        profileImage: IFile;
        username:string,
        followersCount:number,
        followingCount:number,
        followers:[],
        following:[],
        _id:string
    },
    privateMessages?: { _id: string }[],
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