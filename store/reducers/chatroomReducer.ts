import * as types from '../types'
import {SET_ACTIVE_VISIBLE_PROFILE} from "../types";

const initialState = {
    onlineUsers:[],
    messages:[],
    activeVisibleProfile:{}
}

export const chatroomReducer = (state=initialState,action)=>{
    switch (action.type){
        case  types.SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers : action.payload,
            }
        case  types.SET_MESSAGES:
            return {
                ...state,
                messages : action.payload,
            }
        case  types.NEW_MESSAGE:
            return {
                ...state,
                messages : [...state.messages ,action.payload] ,
            }
        case  types.SET_ACTIVE_VISIBLE_PROFILE:
            return {
                ...state,
                activeVisibleProfile : action.payload ,
            }
        default:
            return state
    }
}