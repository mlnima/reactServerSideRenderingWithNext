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
} from '@store/types';
import axios from 'axios';
import Peer from 'simple-peer'
import socket from "@_variables/socket";
import {EXPORT_DETAIL} from "next/constants";
import Axios from "@_variables/util/Axios";

export const userLogin = (username, password) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/login', {username, password}).then(res => {
            res.data.token ? localStorage.setItem('wt', res.data.token) : null
            dispatch({
                type: USER_LOGIN,
                payload: {userData: res.data, loggedIn: true}
            })
        })
    } catch (error) {
        dispatch({
            type: SET_ALERT,
            payload: {message: error.response.data.message, type: 'error'}
        })
        localStorage.wt ? localStorage.removeItem('wt') : null
    }
}

export const userRegister = (data) => async dispatch => {
    dispatch({type: LOADING, payload: true})
    await Axios.post( '/api/v1/users/register', data).then(res=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: res.data.message, type: 'success'}
        })
        dispatch({
            type: LOGIN_REGISTER_FORM,
            payload: 'login'
        })

    }).catch(err=>{
        dispatch({
            type: SET_ALERT,
            payload: {message: err.response.data.message, type: 'error'}
        })

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const autoUserLogin = (fields) => async dispatch => {
    try {
        if (localStorage.wt) {
            await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt, fields}).then(res => {

                dispatch({
                    type: USER_AUTO_LOGIN,
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
                    type: SET_ALERT,
                    payload: {message: res.data.message, type: 'success'}
                })
            }).catch(err => {
                dispatch({
                    type: SET_ALERT,
                    payload: {message: err.response.data.message, type: 'error'}
                })
            })
        } else {
            dispatch({
                type: SET_ALERT,
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
                    type: GET_SPECIFIC_USER_DATA,
                    payload: {userData: res.data.userData, loggedIn: true}
                })
            })
        }
    } catch (err) {
        console.log(err)
    }
}

export const userLogOut = () => dispatch => {
    localStorage.wt ? localStorage.removeItem('wt') : null
    dispatch({
        type: USER_LOGIN,
        payload: {userData: {}, loggedIn: false}
    })
}

export const dispatchSocketId = socketId => dispatch => {
    dispatch({
        type: DISPATCH_SOCKET_ID,
        payload: socketId
    })
}

export const getConversations = _id => async dispatch => {
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getConversations',
        {_id, token: localStorage.wt})
        .then(res => {
            if (res.data?.conversations) {
                dispatch({
                    type: GET_CONVERSATIONS,
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
                    type: GET_CONVERSATION,
                    payload: res.data.conversation
                })
            }
        })
}

export const deleteConversation = _id => async dispatch => {
    await axios.get(process.env.NEXT_PUBLIC_PRODUCTION_URL + `/api/v1/users/deleteConversation?_id=${_id}&token=${localStorage.wt}`)
        .then(res => {
            dispatch({
                type: DELETE_CONVERSATION,
                payload: _id
            })
            dispatch({
                type: SET_ALERT,
                payload: {message: res.data.message, type: 'success'}
            })
        }).catch(err => {
            dispatch({
                type: SET_ALERT,
                payload: {message: err.response.data.message, type: 'error'}
            })
        })
}

export const newMessageInConversation = newMessage => dispatch => {
    dispatch({
        type: NEW_MESSAGE_IN_CONVERSATION,
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
            type: GET_USER_PAGE_DATA,
            payload: res.data.userData
        })
    }).catch(error => {
        console.log(error)
    })
}

export const setPartnerVideo = (partnerVideo) => async dispatch => {
    try {
        dispatch({
            type: SET_PARTNER_VIDEO,
            payload: partnerVideo
        })

    } catch (err) {

    }
}

export const endCall = () => async dispatch => {
    dispatch({
        type: END_CALL,
        payload: true
    })
}

export const incomingCall = (data) => async dispatch => {
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

export const answerTheCall = (myVideo,conversation,callerSignal,router) => async dispatch => {
    dispatch({
        type: SET_CALL_ACCEPTED,
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



export const outgoingCall = (conversation,mySocketId,callerName,router ) => async dispatch => {
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
                    type: SET_PARTNER_VIDEO,
                    payload: stream
                })
            })

            socket.on('callAccepted', (signal) => {
                dispatch({
                    type: SET_CALL_ACCEPTED,
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
            type: SET_ALERT,
            payload: {message: 'Can Not Access The Camera', type: 'error', err}
        })
    }
}


export const userCreateOrder = (data)=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    if (data.type === 'payPal') {
        const body = {
            data
        }
        Axios.post('/api/v1/orders/create/payPal', body).then(res=>{
            dispatch({
                type: SET_ALERT,
                payload: {message: res.data.message, type: 'success'}
            })
        }).catch(()=>{
            dispatch({
                type: SET_ALERT,
                payload: {message: 'Something Went Wrong', type: 'error'}
            })
        }).finally(()=>dispatch({type: LOADING, payload: false}))
    }
}

export const userProfileImageUpload = (image)=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    await Axios.post('/api/v1/fileManager/userImageUpload', image).then(res=>{

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}


export const followUser = (_id:string)=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        _id,
        token: localStorage.wt
    }
    await Axios.post('/api/v1/users/followUser', body).then(res=>{

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const unFollowUser = (_id:string)=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        _id,
        token: localStorage.wt
    }
    await Axios.post('/api/v1/users/unFollowUser', body).then(res=>{

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const sendMessage = (_id:string,message:{})=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        _id,
        message,
        token: localStorage.wt
    }
    await Axios.post('/api/v1/users/sendMessage', body).then(res=>{

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const conversation = (_id:string,push:any)=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        _id,
        token: localStorage.wt
    }
    await Axios.post('/api/v1/users/conversation', body).then(res=>{
        if (res.data?.conversation?._id){
            push(`/messenger/${res.data?.conversation?._id}`)
        }
    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const messageToConversation = (conversationId:string,messageBody:{})=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        conversationId,
        messageBody,
        token: localStorage.wt
    }
    await Axios.post('/api/v1/users/messageToConversation', body).then(res=>{

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}

export const getMultipleUserDataById = (usersList:{}[],type)=> async dispatch =>{
    dispatch({type: LOADING, payload: true})
    const body = {
        usersList
    }
    await Axios.post('/api/v1/users/getMultipleUserDataById', body).then(res=>{
        if (type==='followers'){
            //UPDATE_USER_DATA_FIELD
            dispatch({
                type: UPDATE_USER_DATA_FIELD,
                payload: {followers:res?.data?.users || []}
            })
        }else if (type==='following'){
            dispatch({
                type: UPDATE_USER_DATA_FIELD,
                payload: {following:res?.data?.users || []}
            })
        }

    }).catch(err=>{

    }).finally(()=>dispatch({type: LOADING, payload: false}))
}





// export const likeDislikeView = (id, type)=> async dispatch =>{
//     const body = {
//         id,
//         type
//     };
//     await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/posts/likeDislikeView', body).then(res=>{
//
//     })
// }

export const userDislikePost = (data)=> async dispatch =>{

}


//ecommerce

export const addItemToBasket = (data)=> async dispatch =>{

}


