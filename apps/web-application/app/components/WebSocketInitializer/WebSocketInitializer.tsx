"use client";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {initialIncomingCallAction} from "@store/reducers/mediaConnectionReducer";
import {getAConversationAction} from "@store/reducers//messengerActions/getAConversationAction";
import socket from 'web-socket-client';

const WebSocketInitializer: FC = () => {
    const dispatch = useAppDispatch();
    const {loggedIn} = useAppSelector(({user}) => user)

    useEffect(() => {
        socket.on('incomingCallSocketEvent', ({callType, signal, callerData,conversationId}) => {
            if (conversationId){
                dispatch(getAConversationAction({conversationId}))
            }
            //conversationId

            dispatch(initialIncomingCallAction({
                callType,
                remoteSignal: signal,
                callerData,
            }))
        });
    }, [loggedIn]);

    return null
};
export default WebSocketInitializer


// socket.on('notification', () => console.log('on=> ', 'notification'));
// socket.on('message', () => console.log('on=> ', 'message'));


// return () => {
    // socket.off('incomingMediaCall', () => console.log('off=> ', 'incomingMediaCall'));
    // socket.off('notification', () => console.log('off=> ', 'incomingMediaCall'));
    // socket.off('message', () => console.log('off=> ', 'incomingMediaCall'));
// }