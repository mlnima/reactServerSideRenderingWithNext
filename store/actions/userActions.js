import * as types from "../types";
import axios from 'axios';
import {DISPATCH_SOCKET_ID, GET_SPECIFIC_USER_DATA} from "../types";

export const userLogin = (username,password) => async dispatch=>{
   try {
       await axios.post(process.env.NEXT_PUBLIC_PRODUCTION_URL + '/api/v1/users/login', {username,password}).then(res=>{
           res.data.token ? localStorage.setItem('wt', res.data.token) : null
           dispatch({
               type:types.LOGIN,
               payload:{userData:res.data,loggedIn: true}
           })
       })
   }catch (err){
       localStorage.wt ? localStorage.removeItem('wt') :null
       console.log(err)
   }
}

export const autoUserLogin = (fields) => async dispatch=>{
    try{
        if (localStorage.wt){
            await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt,fields}).then(res=>{
                dispatch({
                    type:types.AUTO_LOGIN,
                    payload:{userData:res.data.userData,loggedIn: true}
                })
            })
        }
    }catch (err){
        console.log(err)
    }
}

export const getSpecificUserData = (fields) => async dispatch=>{
    try{
        if (localStorage.wt){
            await axios.post('/api/v1/users/getSignedInUserData', {token: localStorage.wt,fields}).then(res=>{
                dispatch({
                    type:types.GET_SPECIFIC_USER_DATA,
                    payload:{userData:res.data.userData,loggedIn: true}
                })
            })
        }
    }catch (err){
        console.log(err)
    }
}


export const userLogOut = () => dispatch=>{
    localStorage.wt ? localStorage.removeItem('wt') :null
    dispatch({
        type:types.LOGIN,
        payload:{userData:{},loggedIn: false}
    })
}

export const dispatchSocketId = socketId => dispatch=>{
    dispatch({
        type:types.DISPATCH_SOCKET_ID,
        payload:socketId
    })
}