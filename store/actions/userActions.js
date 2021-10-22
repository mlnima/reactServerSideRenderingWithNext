import * as types from "../types";
import axios from 'axios';
import Peer from 'simple-peer'
import socket from "../../_variables/socket";

export const userLogin = (username, password) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/login', {username, password}).then(res => {
            res.data.token ? localStorage.setItem('wt', res.data.token) : null
            dispatch({
                type: types.LOGIN,
                payload: {userData: res.data, loggedIn: true}
            })
        })
    } catch (error) {
        dispatch({
            type: types.SET_ALERT,
            payload: {message: error.response.data.message, type: 'error'}
        })
        localStorage.wt ? localStorage.removeItem('wt') : null
    }
}

export const autoUserLogin = (fields) => async dispatch => {
    try {
        if (localStorage.wt) {
            await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt, fields}).then(res => {

                dispatch({
                    type: types.AUTO_LOGIN,
                    payload: {userData: res.data.userData, loggedIn: true}
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const userResetPassword = (data) => async dispatch => {

    try {
        if (localStorage.wt) {
            await axios.post('/api/v1/users/resetPassword', {token: localStorage.wt, data}).then(res => {
                dispatch({
                    type: types.SET_ALERT,
                    payload: {message: res.data.message, type: 'success'}
                })
            }).catch(err => {
                dispatch({
                    type: types.SET_ALERT,
                    payload: {message: err.response.data.message, type: 'error'}
                })
            })
        } else {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: 'You Need To Login', type: 'error'}
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const getSpecificUserData = (fields) => async dispatch => {
    try {
        if (localStorage.wt) {
            await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt, fields}).then(res => {
                dispatch({
                    type: types.GET_SPECIFIC_USER_DATA,
                    payload: {userData: res.data.userData, loggedIn: true}
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

// export const getSpecificUserData = (fields) => async dispatch=>{
//     try{
//         if (localStorage.wt){
//             await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt,fields}).then(res=>{
//                 dispatch({
//                     type:types.GET_SPECIFIC_USER_DATA,
//                     payload:{userData:res.data.userData,loggedIn: true}
//                 })
//             })
//         }
//     }catch (err){
//     }
// }

export const userLogOut = () => dispatch => {
    localStorage.wt ? localStorage.removeItem('wt') : null
    dispatch({
        type: types.LOGIN,
        payload: {userData: {}, loggedIn: false}
    })
}

export const dispatchSocketId = socketId => dispatch => {
    dispatch({
        type: types.DISPATCH_SOCKET_ID,
        payload: socketId
    })
}

export const getConversations = _id => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getConversations',
        {_id, token: localStorage.wt})
        .then(res => {
            if (res.data?.conversations) {
                dispatch({
                    type: types.GET_CONVERSATIONS,
                    payload: res.data.conversations
                })
            }
        })
}

export const getConversation = (_id, loadAmount) => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getConversation',
        {
            _id,
            loadAmount,
            token: localStorage.wt
        })
        .then(res => {
            if (res.data?.conversation) {
                dispatch({
                    type: types.GET_CONVERSATION,
                    payload: res.data.conversation
                })
            }
        })
}

export const deleteConversation = _id => async dispatch => {
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`)
        .then(res => {
            dispatch({
                type: types.DELETE_CONVERSATION,
                payload: _id
            })
            dispatch({
                type: types.SET_ALERT,
                payload: {message: res.data.message, type: 'success'}
            })
        }).catch(err => {
            dispatch({
                type: types.SET_ALERT,
                payload: {message: err.response.data.message, type: 'error'}
            })
        })
}

export const newMessageInConversation = newMessage => dispatch => {
    dispatch({
        type: types.NEW_MESSAGE_IN_CONVERSATION,
        payload: newMessage
    })
}

export const getUserPageData = (username, _id, fields) => async dispatch => {
    const body = {
        username,
        fields,
        _id
    }
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getUserPreviewData', body).then(res => {
        dispatch({
            type: types.GET_USER_PAGE_DATA,
            payload: res.data.userData
        })
    }).catch(error => {
        console.log(error)
    })
}

// export const setMyVideo = () => async dispatch => {
//     try {
//         await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myStreamData => {
//             dispatch({
//                 type: types.SET_MY_STREAM,
//                 payload: myStreamData
//             })
//         })
//     } catch (err) {
//         dispatch({
//             type: types.SET_ALERT,
//             payload: {message: 'Can Not Access The Camera', type: 'error', err}
//         })
//     }
// }

export const setPartnerVideo = (partnerVideo) => async dispatch => {
    try {
        dispatch({
            type: types.SET_PARTNER_VIDEO,
            payload: partnerVideo
        })

    } catch (err) {

    }
}
// export const setCallingStatus = (status) => async dispatch => {
//     dispatch({
//         type: types.SET_CALLING_STATUS,
//         payload: status
//     })
// }
// export const setCallAccepted = (status) => async dispatch => {
//     dispatch({
//         type: types.SET_CALL_ACCEPTED,
//         payload: {
//             callAccepted: true,
//             calling: false,
//         }
//     })
// }

export const endCall = () => async dispatch => {
    dispatch({
        type: types.END_CALL,
        payload: true
    })
}
//
// export const setCallerData = (callerData) => dispatch => {
//     dispatch({
//         type: types.SET_CALLER_DATA,
//         payload: callerData
//     })
// }

// export const setReceivingCall = (status) => dispatch => {
//     dispatch({
//         type: types.SET_RECEIVING_CALL_STATUS,
//         payload: status
//     })
// }

export const incomingCall = (data) => async dispatch => {
    try {
        await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myVideo => {
            dispatch({
                type: types.INCOMING_CALL,
                payload: {
                    receivingCall: true,
                    myVideo,
                    ...data,
                }
            })
        })
    } catch (err) {
        dispatch({
            type: types.SET_ALERT,
            payload: {message: 'Can Not Access The Camera', type: 'error', err}
        })
    }
}

export const answerTheCall = (myVideo,conversation,callerSignal,router) => async dispatch => {
    dispatch({
        type: types.SET_CALL_ACCEPTED,
        payload: {
            callAccepted: true,
        }
    })
    const peer = new Peer({
        initiator: false,
        trickle: false,
        stream:myVideo
    })

    peer.on('signal', (data) => {
        socket.emit('answerCall', { signal:data, conversation})
    })

    peer.on('stream', (partnerVideo) => {
        dispatch({
            type: types.SET_PARTNER_VIDEO,
            payload: partnerVideo
        })
    })

    peer.signal(callerSignal)

    socket.on('endCall', () => {
        dispatch({
            type: types.END_CALL,
            payload: true
        })
        peer.destroy()
        router.reload()
    })


    peer.on("error", (error) => {
      console.log(error)
    })


}



export const outgoingCall = (conversation,mySocketId,callerName,router ) => async dispatch => {
    try {
        await navigator?.mediaDevices?.getUserMedia({video: true, audio: true}).then(async myVideo => {
            await dispatch({
                type: types.OUTGOING_CALL,
                payload: {
                    calling: true,
                    myVideo,
                }
            })
            const peer = new Peer({
                initiator: true,
                trickle: false,
                stream:myVideo
            })

            peer.on('signal', (data) => {
                socket.emit("callToConversation", {
                    conversation,
                    callerSignal:data,
                    callerId:mySocketId,
                    callerName
                })
            })

            peer.on('stream', (stream) => {
                console.log(stream)
                dispatch({
                    type: types.SET_PARTNER_VIDEO,
                    payload: stream
                })
            })

            socket.on('callAccepted', (signal) => {
                dispatch({
                    type: types.SET_CALL_ACCEPTED,
                    payload: {
                        callAccepted:true,
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
            type: types.SET_ALERT,
            payload: {message: 'Can Not Access The Camera', type: 'error', err}
        })
    }
}
