import Peer from 'simple-peer';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "custom-util/src/socket-utils/socketIoClient";

import {setAlert} from "@store_toolkit/clientReducers/globalStateReducer";
import {setMyVideoAction} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setMyVideoAction";
import {
    setPartnerVideoAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setPartnerVideoAction";
import {
    setCallAcceptedAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setCallAcceptedAction";

interface OutgoingCallActionArgs {
    conversation: string;
    mySocketId: string;
    callerName: string;
    router: any; // Replace "any" with actual type of router
}

interface OutgoingCallActionResponse {}

export const outgoingCallAction = createAsyncThunk<
    OutgoingCallActionResponse,
    OutgoingCallActionArgs
>('user/outgoingCallAction', async ({ conversation, mySocketId, callerName, router }, thunkAPI) => {
    try {
        const myVideo = await navigator?.mediaDevices?.getUserMedia({ video: true, audio: true });
        if (!myVideo) {
            thunkAPI.dispatch(setAlert({ message: 'Can Not Access The Camera', type: 'error' }));
        }

        thunkAPI.dispatch(setMyVideoAction(myVideo));

        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: myVideo
        });

        peer.on('signal', (data) => {
            socket.emit("callToConversation", {
                conversation,
                callerSignal: data,
                callerId: mySocketId,
                callerName
            });
        });

        peer.on('stream', (stream) => {
            thunkAPI.dispatch(setPartnerVideoAction(stream));
        });

        socket.on('callAccepted', (signal) => {
            thunkAPI.dispatch(setCallAcceptedAction(true));
            peer.signal(signal);
        });

        socket.on('endCall', () => {
            thunkAPI.dispatch(setCallAcceptedAction(false));
            peer.destroy();
            router.reload();
        });

        peer.on("error", (error) => {
            console.log(error);
        });

    } catch (error) {
        console.log(error);
        thunkAPI.dispatch(setAlert({ message: 'Can Not Access The Camera', type: 'error', error }));
    }
});




















//outgoingCallAction
// import Peer from 'simple-peer'
// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {socket} from "custom-util/src/socket-utils/socketIoClient";
// import {
//     setCallAccepted,
//     setMyVideoData,
//     setPartnerVideoData
// } from "@store_toolkit/clientReducers/userReducers/userReducer";
//
//
// interface FetchOutgoingCall {
//     conversation: string,
//     mySocketId: string,
//     callerName: string,
//     router: any
// }
//
//
// export const outgoingCallAction = createAsyncThunk(
//     'user/outgoingCallAction',
//     async ({conversation, mySocketId, callerName, router}: FetchOutgoingCall, thunkAPI) => {
//         try {
//             await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myVideo => {
//
//                 thunkAPI.dispatch(setMyVideoData(myVideo))
//
//                 const peer = new Peer({
//                     initiator: true,
//                     trickle: false,
//                     stream: myVideo
//                 })
//
//                 peer.on('signal', (data) => {
//                     socket.emit("callToConversation", {
//                         conversation,
//                         callerSignal: data,
//                         callerId: mySocketId,
//                         callerName
//                     })
//                 })
//
//                 peer.on('stream', (stream) => {
//                     thunkAPI.dispatch(setPartnerVideoData(stream))
//                     // console.log(stream)
//                     // dispatch({
//                     //     type: SET_PARTNER_VIDEO,
//                     //     payload: stream
//                     // })
//                 })
//
//                 socket.on('callAccepted', (signal) => {
//                     thunkAPI.dispatch(setCallAcceptedAction(true))
//                     // dispatch({
//                     //     type: SET_CALL_ACCEPTED,
//                     //     payload: {
//                     //         callAccepted: true,
//                     //     }
//                     // })
//                     peer.signal(signal)
//                 })
//
//                 socket.on('endCall', () => {
//                     thunkAPI.dispatch(setCallAcceptedAction(false))
//                     peer.destroy()
//                     router.reload()
//                 })
//
//                 peer.on("error", (error) => {
//                     console.log(error)
//                 })
//
//             })
//
//         } catch (err) {
//             thunkAPI.dispatch(setAlert({message: 'Can Not Access The Camera', type: 'error', err}))
//         }
//     }
// )