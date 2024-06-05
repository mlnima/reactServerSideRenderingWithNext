export interface MediaConnectionState {
    mediaCall: false;
    onGoingCall: false;
    callType: 'video' | 'audio' | 'stream' | null;
    incomingCall: false;
    remoteSignal: any;
    callerData: {
        profileImage: string;
        username: string;
        _id: string;
    };
    outGoingCall: false;
    callAccepted: boolean;
    callRejected: boolean;
}
//# sourceMappingURL=MediaConnectionState.d.ts.map