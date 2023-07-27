import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store/store";
import {MediaConnectionState} from "typescript-types";

const initialState: MediaConnectionState = {
    mediaCall: false,
    onGoingCall: false,
    incomingCall: false,
    outGoingCall: false,
    callerData: {
        profileImage: '',
        username: '',
        _id: '',
    },
    callAccepted: false,
    callRejected: false,
    remoteSignal: null,
    callType: null,
};

interface IInitialIncomingCallAction {
    callType: 'video' | 'audio' | 'stream',
    remoteSignal: any,
    callerData: any
}

interface IInitialOutGoingCallAction {
    callType?: 'video' | 'audio' | 'stream',
}

interface IInitialAcceptIncomingCall {
    callType: 'video' | 'audio' | 'stream',
    localStream: MediaStream | null,
    remoteStream: MediaStream | null,
}


export const mediaConnectionSlice = createSlice({
    name: 'mediaConnection',
    initialState,
    reducers: {
        //@ts-ignore
        initialOutGoingCallAction: (state, action: PayloadAction<IInitialOutGoingCallAction>) => {
            return {
                ...state,
                mediaCall: true,
                callType: action.payload?.callType || 'video',
            }
        },
        //@ts-ignore
        initialOutGoingCallConfirmAction: (state) => {
            return {
                ...state,
                outGoingCall: true,
            }
        },
        // @ts-ignore
        initialIncomingCallAction: (state, action: PayloadAction<IInitialIncomingCallAction>) => {
            return {
                ...state,
                mediaCall: true,
                incomingCall: true,
                callerData: action.payload?.callerData || {},
                callType: action.payload?.callType || 'video',
                remoteSignal: action.payload?.remoteSignal
            }
        },
//@ts-ignore
        initialAcceptIncomingCall: (state) => {
            return {
                ...state,
                outGoingCall: false,
                incomingCall: false,
                onGoingCall: true,
            }
        },
        //@ts-ignore
        initialAcceptOutGoingCall:(state)=>{
            return {
                ...state,
                outGoingCall: false,
                incomingCall: false,
                onGoingCall: true,
            }
        },
        rejectCall: (state) => {
            state.callRejected = true;
        },
        resetMediaConnectionAction: (state, action) => {
            return {
                mediaCall: false,
                onGoingCall: false,
                incomingCall: false,
                outGoingCall: false,
                callerData: {
                    profileImage: '',
                    username: '',
                    _id: '',
                },
                callAccepted: false,
                callRejected: false,
                remoteSignal: null,
                callType: null,
            }
        }
    },
    // extraReducers: (builder) => {
    //     builder
    //
    // },
});

export const {
    initialOutGoingCallAction,
    initialAcceptOutGoingCall,
    initialOutGoingCallConfirmAction,
    initialIncomingCallAction,
    initialAcceptIncomingCall,
    resetMediaConnectionAction,
    acceptCall,
    rejectCall,
    setLocalStream,
    setRemoteStream,
} = mediaConnectionSlice.actions;

export const mediaConnectionReducer = (state: RootState) => state.mediaConnection || null;
//@ts-ignore
export default mediaConnectionSlice.reducer;


// const initialState: MediaConnectionState = {
//     onGoingCall: false,
//     incomingCall: false,
//     outGoingCall: false,
//     isRinging: true,
//     callerData: {
//         profileImage: 'https://concerninghistory.org/wp-content/uploads/2019/04/Thanos_MCU.0-1.jpg',
//         username: 'Alexis',
//     },
//     // receivingCall:true,
//     callAccepted: false,
//     callRejected: false,
//     localStream: null,
//     callType: 'video',
// };