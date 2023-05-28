import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
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

// const initialState: MediaConnectionState = {
//     onGoingCall: false,
//     incomingCall: false,
//     outGoingCall: false,
//     isRinging: true,
//     callerData: {
//         profileImage: 'https://neural.love/cdn/ai-photostock/1eda0bbe-6832-6340-9681-35dc2e106b43/0.jpg?Expires=1685577599&Signature=ur3kxHbZgg8d0hKvPuKVVzpIBR1PYDq9dEMtTfRE3rDadhDenlnN4KyVgGu-ACj0KY4UqtW3A63Xmz4pW3h7ELB-M7LPyCxTT044lzXnzBfs~ts9JBJ9KUVomj7MfLRWWuTroDn42ZwWIASgx3apGS-IMmzbcomPA5l4CkwOxE-3WcKhzMVijLpeDFHpx1RBHMBsw7nxd7~OTkMOgwc--Y8D10nANnAaHeqMJ6pqPczbsj6txBvklD4yF46R0f33ez7C1Qf5FVPy0Od9Iaa-uT4xd2jGR7V-fNbdZCXEKItJ50eaQwZ92TXMCQ99ZZrplIVJI-TnhKp3St1UvGTg7w__&Key-Pair-Id=K2RFTOXRBNSROX',
//         username: 'Alexis',
//     },
//     // receivingCall:true,
//     callAccepted: false,
//     callRejected: false,
//     localStream: null,
//     callType: 'video',
// };

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
