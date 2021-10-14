import * as types from "../types";
import axios from 'axios';

export const userLogin = (username, password) => async dispatch => {
    try {
        await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/login', {username, password}).then(res => {
            res.data.token ? localStorage.setItem('wt', res.data.token) : null
            dispatch({
                type: types.LOGIN,
                payload: {userData: res.data, loggedIn: true}
            })
        })
    } catch (err) {
        localStorage.wt ? localStorage.removeItem('wt') : null
        console.log(err)
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
                    payload: {message:res.data.message,type:'Success'}
                })
            }).catch(error=>{
                dispatch({
                    type: types.SET_ALERT,
                    payload: {message:error.response.data.message,type:'Error'}
                })
            })
        }else {
            dispatch({
                type: types.SET_ALERT,
                payload: {message:'You Need To Login',type:'Error'}
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

export const getConversation = (_id,loadAmount) => async dispatch => {
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

export const newMessageInConversation = newMessage =>  dispatch => {
    dispatch({
        type: types.NEW_MESSAGE_IN_CONVERSATION,
        payload: newMessage
    })
}

export const getUserPageData =  (username,_id,fields) => async dispatch => {
    const body = {
        username,
        fields,
        _id
    }
    await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/getUserPreviewData', body).then(res=>{
        dispatch({
            type: types.GET_USER_PAGE_DATA,
            payload: res.data.userData
        })
    }).catch(error=>{
        console.log(error)
    })
}