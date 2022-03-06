import {
    AUTO_LOGIN,
    DELETE_CONVERSATION,
    DISPATCH_SOCKET_ID, END_CALL,
    GET_CONVERSATION,
    GET_CONVERSATIONS,
    GET_SPECIFIC_USER_DATA,
    GET_USER_PAGE_DATA,
    INCOMING_CALL,
    LOGIN,
    LOGOUT,
    NEW_MESSAGE_IN_CONVERSATION,
    OUTGOING_CALL,
    SET_CALL_ACCEPTED,
    SET_CALLING_STATUS,
    SET_MY_VIDEO,
    SET_PARTNER_VIDEO,
    SET_USER_PAGE_DATA
} from "@store/types";

import {UserState} from "@_variables/TypeScriptTypes/GlobalTypes";

const initialState = {
    userData:{},
    userRatingData:{},
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
        case  SET_USER_PAGE_DATA:
            return {
                ...state,
                userPageData:action.payload
            }
        case  GET_USER_PAGE_DATA:
            return {
                ...state,
                userPageData:action.payload
            }
        case  AUTO_LOGIN:
            return {
                ...state,
                userData:action.payload.userData,
                loggedIn:action.payload.loggedIn,
            }
        case  GET_SPECIFIC_USER_DATA:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload.userData
                },
            }
        case  LOGIN:
            return {
                ...state,
                userData:action.payload.userData,
                loggedIn:action.payload.loggedIn,
            }
        case  LOGOUT:
            return {
                ...state,
                userData:{},
            }
        case  DISPATCH_SOCKET_ID:
            return {
                ...state,
                socketId:action.payload,
            }
        case  GET_CONVERSATIONS:
            return {
                ...state,
                conversations:action.payload,
            }
        case  GET_CONVERSATION:
            return {
                ...state,
                activeConversation:action.payload,
            }

        case  DELETE_CONVERSATION:
            return {
                ...state,
                conversations: state.conversations?.filter(conversation=> conversation._id !== action.payload),
            }
        case  NEW_MESSAGE_IN_CONVERSATION:
            return {
                ...state,
                activeConversation:{
                    ...state.activeConversation,
                    messages: [...(state.activeConversation?.messages || []), action.payload]
                }
            }
        case  SET_MY_VIDEO:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    myVideo:action.payload,
                }
            }
        case  SET_PARTNER_VIDEO:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    partnerVideo:action.payload,
                }
            }
        case  SET_CALLING_STATUS:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    calling:action.payload,
                }
            }
        case  INCOMING_CALL:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload,
                }
            }
        case  OUTGOING_CALL:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload,
                }
            }
        case  SET_CALL_ACCEPTED:
            return {
                ...state,
                callData: {
                    ...state.callData,
                    ...action.payload
                }
            }

        case  END_CALL:
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