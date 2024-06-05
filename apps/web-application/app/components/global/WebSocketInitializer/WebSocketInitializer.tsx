"use client";
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@store/hooks";
import {initialIncomingCallAction} from "@store/reducers/mediaConnectionReducer";
// import {getAConversationAction} from "@store/reducers//messengerActions/getAConversationAction";
import socket from '@lib/web-socket-client';

const WebSocketInitializer: FC = () => {
    const dispatch = useAppDispatch();
    const {loggedIn} = useAppSelector(({user}) => user)
    const {userData} = useAppSelector(({user}) => user)

    useEffect(() => {
        socket.on('incomingCallSocketEvent', ({callType, signal, callerData,conversationId}) => {
            // if (conversationId){
            //     dispatch(getAConversationAction({conversationId}))
            // }
            //conversationId

            dispatch(initialIncomingCallAction({
                callType,
                remoteSignal: signal,
                callerData,
            }))
        });


        //CHANGE SOCKET ID TO USER ID ON LOGIN
        if (loggedIn && !!userData?._id){
            socket.emit('initialLoggedInUserSocket', {userId:userData._id})
        }


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