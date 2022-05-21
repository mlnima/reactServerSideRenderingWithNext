import {
    USER_AUTO_LOGIN,
    DELETE_CONVERSATION,
    DISPATCH_SOCKET_ID,
    END_CALL,
    GET_CONVERSATION,
    GET_CONVERSATIONS,
    GET_SPECIFIC_USER_DATA,
    GET_USER_PAGE_DATA,
    INCOMING_CALL,
    USER_LOGIN,
    NEW_MESSAGE_IN_CONVERSATION,
    OUTGOING_CALL,
    SET_ALERT,
    SET_CALL_ACCEPTED,
    SET_PARTNER_VIDEO, LOADING, LOGIN_REGISTER_FORM, UPDATE_USER_DATA_FIELD
} from '../../temp/legacyCodesAndComponents/store/types';

import Peer from 'simple-peer'
import {socket} from '@_variables/socket';
import Axios from "@_variables/util/Axios";
import {AnyAction} from "redux";


//@ts-ignore
export const incomingCall = (data): AnyAction => async dispatch => {
    try {
        await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myVideo => {
            dispatch({
                type: INCOMING_CALL,
                payload: {
                    receivingCall: true,
                    myVideo,
                    ...data,
                }
            })
        })
    } catch (err) {
        dispatch({
            type: SET_ALERT,
            payload: {message: 'Can Not Access The Camera', type: 'error', err}
        })
    }
}

//@ts-ignore
export const answerTheCall = (myVideo, conversation, callerSignal, router): AnyAction => async dispatch => {
    dispatch({
        type: SET_CALL_ACCEPTED,
        payload: {
            callAccepted: true,
        }
    })
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream: myVideo
    })

    peer.on('signal', (data) => {
        socket.emit('answerCall', {signal: data, conversation})
    })

    peer.on('stream', (partnerVideo) => {
        dispatch({
            type: SET_PARTNER_VIDEO,
            payload: partnerVideo
        })
    })

    peer.signal(callerSignal)

    socket.on('endCall', () => {
        dispatch({
            type: END_CALL,
            payload: true
        })
        peer.destroy()
        router.reload()
    })


    peer.on("error", (error) => {
        console.log(error)
    })


}

//@ts-ignore
export const outgoingCall = (conversation, mySocketId, callerName, router): AnyAction => async dispatch => {
    try {
        await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myVideo => {
            await dispatch({
                type: OUTGOING_CALL,
                payload: {
                    calling: true,
                    myVideo,
                }
            })
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream: myVideo
            })

            peer.on('signal', (data) => {
                socket.emit("callToConversation", {
                    conversation,
                    callerSignal: data,
                    callerId: mySocketId,
                    callerName
                })
            })

            peer.on('stream', (stream) => {
                console.log(stream)
                dispatch({
                    type: SET_PARTNER_VIDEO,
                    payload: stream
                })
            })

            socket.on('callAccepted', (signal) => {
                dispatch({
                    type: SET_CALL_ACCEPTED,
                    payload: {
                        callAccepted: true,
                    }
                })
                peer.signal(signal)
            })

            socket.on('endCall', () => {
                peer.destroy()
                router.reload()
            })

            peer.on("error", (error) => {
                console.log(error)
            })
        })
    } catch (err) {
        dispatch({
            type: SET_ALERT,
            payload: {message: 'Can Not Access The Camera', type: 'error', err}
        })
    }
}

