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
    }
}

export const userReducer = (state: UserState  = initialState,action: {type:string,payload:any})=>{
    switch (action.type){
        case  types.SET_USER_PAGE_DATA:
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
        case  types.NEW_MESSAGE_IN_CONVERSATION:
            return {
                ...state,
                activeConversation:{
                    ...state.activeConversation,
                    messages: [
                        ...(state.activeConversation?.messages || []),
                        action.payload
                    ]
                }
            }
        default:
            return state
    }
}