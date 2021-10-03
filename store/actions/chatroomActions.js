import * as types from "../types";
import {SET_ACTIVE_VISIBLE_PROFILE} from "../types";

export const setChatroomUsers = usersList => dispatch=>{
    dispatch({
        type:types.SET_ONLINE_USERS,
        payload: usersList
    })
}

export const setChatroomMessages = Messages => dispatch=>{
    dispatch({
        type:types.SET_MESSAGES,
        payload: Messages
    })
}

export const newMessage = Message => dispatch=>{
    dispatch({
        type:types.NEW_MESSAGE,
        payload: Message
    })
}

export const setActiveVisibleProfile = activeProfile => dispatch=>{
    dispatch({
        type:types.SET_ACTIVE_VISIBLE_PROFILE,
        payload: activeProfile
    })
}