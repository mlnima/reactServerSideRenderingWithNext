import { TCallType } from '../messengerTypes/Communications';

export interface MediaConnectionState {
    //common
    mediaCall: false,
    onGoingCall: false,
    callType: TCallType | null,
    //receiver of the call request
    incomingCall: false,
    remoteSignal: any,
    callerData:{
        profileImage:string,
        username:string,
        _id:string,
    },
    //sender af the call request
    outGoingCall: false,
    callAccepted: boolean,
    callRejected: boolean,
}