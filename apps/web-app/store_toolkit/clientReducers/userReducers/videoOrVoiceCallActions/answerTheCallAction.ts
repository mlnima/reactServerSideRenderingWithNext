import Peer from 'simple-peer';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { socket } from "custom-util/src/socket-utils/socketIoClient";
import { setPartnerVideoAction } from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setPartnerVideoAction";
import {
    setCallAcceptedAction
} from "@store_toolkit/clientReducers/userReducers/videoOrVoiceCallActions/setCallAcceptedAction";


interface AnswerTheCallActionArguments {
    myVideo: any; // Replace "any" with actual type of myVideo
    conversation: string;
    callerSignal: any; // Replace "any" with actual type of callerSignal
    router: any;
}

export const answerTheCallAction = createAsyncThunk(
    'user/answerTheCallAction',
    async ({ myVideo, conversation, callerSignal, router }: AnswerTheCallActionArguments, thunkAPI) => {
        thunkAPI.dispatch(setCallAcceptedAction(true));
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: myVideo
        });

        peer.on('signal', (data) => {
            socket.emit('answerCall', {signal: data, conversation});
        });

        peer.on('stream', (partnerVideo) => {
            thunkAPI.dispatch(setPartnerVideoAction(partnerVideo));
        });

        peer.signal(callerSignal);

        socket.on('endCall', () => {
            peer.destroy();
            router.reload();
        });

        peer.on("error", (error) => {
            console.log(error);
        });
    }
);