import {NEW_MESSAGE, SET_ACTIVE_VISIBLE_PROFILE, SET_MESSAGES, SET_ONLINE_USERS} from "@store/types";


const initialState = {
    onlineUsers:[],
    messages:[],
    activeVisibleProfile:{}
}

export const chatroomReducer = (state=initialState,action)=>{
    switch (action.type){
        case  SET_ONLINE_USERS:
            return {
                ...state,
                onlineUsers : action.payload,
            }
        case  SET_MESSAGES:
            return {
                ...state,
                messages : action.payload,
            }
        case  NEW_MESSAGE:
            return {
                ...state,
                messages : [...state.messages ,action.payload] ,
            }
        case  SET_ACTIVE_VISIBLE_PROFILE:
            return {
                ...state,
                activeVisibleProfile : action.payload ,
            }
        default:
            return state
    }
}