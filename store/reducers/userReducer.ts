import * as types from '../types'
import {UserState} from "../../_variables/TypeScriptTypes/GlobalTypes";

const initialState = {
    userData:{},
    loggedIn:false,
    userPageData:{},
    conversations:[],
    activeConversation:{
        messages:[],
        users:[]
    },
    callData:{
        myVideo:null,
        partnerVideo:null,
        callerSignal:null,
        calling:false,
        receivingCall:false,
        callAccepted:false,
        callerName:'',
        callerId:'',
        userStreamData:null
    }
}

// @ts-ignore
export const userReducer = (state: UserState  = initialState,action: {type:string,payload:any})=>{
    switch (action.type){
        case  types.SET_USER_PAGE_DATA:
            return {
                ...state,
                userPageData:action.payload
            }
        case  types.GET_USER_PAGE_DATA:
            return {
                ...state,
                userPageData:action.payload
            }
        case  types.AUTO_LOGIN:
            return {
                ...state,
                userData:action.payload.userData,
                loggedIn:action.payload.loggedIn,
            }
        case  types.GET_SPECIFIC_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload.userData
                },
            }
        case  types.LOGIN:
            return {
                ...state,
                userData:action.payload.userData,
                loggedIn:action.payload.loggedIn,
            }
        case  types.LOGOUT:
            return {
                ...state,
                userData:{},
            }
        case  types.DISPATCH_SOCKET_ID:
            return {
                ...state,
                socketId:action.payload,
            }
        case  types.GET_CONVERSATIONS:
            return {
                ...state,
                conversations:action.payload,
            }
        case  types.GET_CONVERSATION:
            return {
                ...state,
                activeConversation:action.payload,
            }

        case  types.DELETE_CONVERSATION:
            return {
                ...state,
                conversations: state.conversations?.filter(conversation=> conversation._id !== action.payload),
            }
        case  types.NEW_MESSAGE_IN_CONVERSATION:
            return {
                ...state,
                activeConversation:{
                    ...state.activeConversation,
                    messages: [...(state.activeConversation?.messages || []), action.payload]
                }
            }
        case  types.SET_MY_VIDEO:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    myVideo:action.payload,
                }
            }
        case  types.SET_PARTNER_VIDEO:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    partnerVideo:action.payload,
                }
            }
        case  types.SET_CALLING_STATUS:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    calling:action.payload,
                }
            }
        case  types.INCOMING_CALL:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload,
                }
            }
        case  types.OUTGOING_CALL:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload,
                }
            }
        case  types.SET_CALL_ACCEPTED:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload
                }
            }

        case  types.END_CALL:
            return {
                ...state,
                callData:{
                    myVideo:null,
                    partnerVideo:null,
                    callerSignal:null,
                    calling:false,
                    receivingCall:false,
                    callAccepted:false,
                    callerName:null,
                    callerId:null,
                    userStreamData:null
                }
            }
        default:
            return state
    }
}