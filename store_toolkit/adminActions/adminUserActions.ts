// import axios, {AxiosError, AxiosResponse} from "axios";
// import {AxiosErrorTypes} from "@_variables/TypeScriptTypes/GlobalTypes";
// import {LOADING, SET_ALERT} from "../../ZlegacyCodesAndComponents/store/types";
// import {ADMIN_EDIT_USER_DATA, ADMIN_GET_USER, ADMIN_GET_USERS} from "../adminTypes";
// import Axios from "@_variables/util/Axios";
// import {AnyAction} from "redux";
//
// //@ts-ignore
// export const adminGetUsers = (data):AnyAction => async dispatch => {
//     dispatch({type: LOADING, payload: true})
//     try{
//         const body = {
//             data,
//             token: localStorage.wt
//         };
//         await Axios.post( '/api/admin/users/getUsersList', body).then((res: AxiosResponse<any>)=>{
//             dispatch({
//                 type: ADMIN_GET_USERS,
//                 payload: {
//                     users:res.data.users,
//                     totalCount:res.data.totalCount || 0
//                 }
//             })
//
//         }).catch((err: AxiosError<AxiosErrorTypes>)=>{
//
//         }).finally(()=>dispatch({type: LOADING, payload: false}))
//
//
//     }catch (err){
//         dispatch({
//             type: LOADING,
//             payload: false
//         })
//     }
//
// }
//
// //@ts-ignore
// export const newAPIKey = ():AnyAction => async dispatch => {
//     if (localStorage.wt){
//         dispatch({
//             type: LOADING,
//             payload: true
//         })
//         await Axios.post( '/api/admin/users/newAPIKey', {token: localStorage.wt})
//             .then(()=>{
//                 dispatch({
//                     type:SET_ALERT,
//                     payload:{
//                         active:true,
//                         type:'success',
//                         message:'New API KEY Generated'
//                     }
//                 })
//
//             }).catch(()=>{
//                 dispatch({
//                     type:SET_ALERT,
//                     payload:{
//                         active:true,
//                         type:'error',
//                         message:'Something Went Wrong'
//                     }
//                 })
//
//             }).finally(()=>{
//                 dispatch({
//                     type: LOADING,
//                     payload: false
//                 })
//             })
//     }
// }
//
// //@ts-ignore
// export const adminPanelGetUserData = (_id):AnyAction => async dispatch => {
//     dispatch({type: LOADING, payload: true})
//     const body = {
//         _id,
//         token: localStorage.wt
//     }
//     await Axios.post( '/api/admin/users/getUser', body)
//         .then(res=>{
//             dispatch({
//                 type: ADMIN_GET_USER,
//                 payload: res.data.user
//             })
//         }).catch(err=>{
//             dispatch({
//                 type:SET_ALERT,
//                 payload:{
//                     active:true,
//                     type:'error',
//                     message:'Can Not Get User Data'
//                 }
//             })
//
//         }).finally(()=>{
//             dispatch({
//                 type: LOADING,
//                 payload: false
//             })
//         })
// }
//
//
// //@ts-ignore
// export const adminPanelChangeUserData = (changes):AnyAction => async dispatch => {
//     dispatch({
//         type: ADMIN_EDIT_USER_DATA,
//         payload: changes
//     })
// }
//
//
// //000000000000000000000000000000000000000000000000
// //@ts-ignore
// export const adminPanelUpdateUserData = (data):AnyAction => async dispatch => {
//     dispatch({type: LOADING, payload: true})
//     const body = {
//         data,
//         token: localStorage.wt
//     }
//     await Axios.post('/api/v1/users/updateUserData', body).then(res=>{
//         dispatch({
//             type:SET_ALERT,
//             payload:{
//                 active:true,
//                 type:'success',
//                 message:'User Updated'
//             }
//         })
//     }).catch(err=>{
//         dispatch({
//             type:SET_ALERT,
//             payload:{
//                 active:true,
//                 type:'error',
//                 message:'Can Not Get User Data'
//             }
//         })
//     }).finally(()=>dispatch({type: LOADING, payload: false}))
// }
//
// //@ts-ignore
// export const adminPanelDeleteUser = (id,router):AnyAction => async dispatch => {
//     dispatch({type: LOADING, payload: true})
//     const body = {
//         id,
//         token: localStorage.wt
//     }
//     await Axios.post('/api/admin/users/deleteUser', body).then(res=>{
//         dispatch({
//             type:SET_ALERT,
//             payload:{
//                 active:true,
//                 type:'success',
//                 message:'User Deleted'
//             }
//         })
//     }).catch(err=>{
//         dispatch({
//             type:SET_ALERT,
//             payload:{
//                 active:true,
//                 type:'error',
//                 message:'Can Not Delete User'
//             }
//         })
//     }).finally(()=>{
//         dispatch({type: LOADING, payload: false})
//         router.back()
//     })
// }
// //@ts-ignore
// export const adminPanelChangePassword = (oldPass, newPass, newPass2):AnyAction => async dispatch => {
//     let body = {
//         oldPass,
//         newPass,
//         newPass2,
//         token: localStorage.wt
//     }
//     await Axios.post( '/api/v1/users/resetPassword', body).then(res=>{
//         dispatch({
//             type:SET_ALERT,
//             payload:{
//                 active:true,
//                 type:'success',
//                 message:'Password Changed'
//             }
//         })
//     }).catch(err=>{
//         dispatch({
//             type:SET_ALERT,
//             payload:{
//                 active:true,
//                 type:'error',
//                 message:'Can Not Change The Password'
//             }
//         })
//     }).finally(()=>dispatch({type: LOADING, payload: false}))
// }