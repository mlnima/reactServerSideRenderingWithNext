import {FC, useEffect} from "react";
import {socket} from 'custom-util';
import {useSelector} from "react-redux";
import {Store} from "typescript-types";
import {useAppDispatch} from "@store_toolkit/hooks";
import {initialIncomingCallAction} from "@store_toolkit/clientReducers/mediaConnectionReducer";
import {getAConversationAction} from "@store_toolkit/clientReducers/messengerActions/getAConversationAction";

const SocketEventHandler: FC = () => {
    const dispatch = useAppDispatch();
    const {loggedIn} = useSelector(({user}: Store) => user)


    useEffect(() => {

        if (loggedIn) {

            socket.on('incomingCallSocketEvent', ({callType, signal, callerData,conversationId}) => {
                console.log('incomingCallSocketEventHandler=> ',callerData,callType)
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

            socket.on('notification', () => console.log('on=> ', 'notification'));
            socket.on('message', () => console.log('on=> ', 'message'));


            return () => {
                socket.off('incomingMediaCall', () => console.log('off=> ', 'incomingMediaCall'));
                socket.off('notification', () => console.log('off=> ', 'incomingMediaCall'));
                socket.off('message', () => console.log('off=> ', 'incomingMediaCall'));
            }
        }
    }, [loggedIn]);

    return null
};
export default SocketEventHandler;
