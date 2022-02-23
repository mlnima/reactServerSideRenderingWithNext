import {NEW_MESSAGE, SET_ACTIVE_VISIBLE_PROFILE, SET_MESSAGES, SET_ONLINE_USERS} from "@store/types";


export const setChatroomUsers = usersList => dispatch=>{
    dispatch({
        type:SET_ONLINE_USERS,
        payload: usersList
    })
}

export const setChatroomMessages = Messages => dispatch=>{
    dispatch({
        type:SET_MESSAGES,
        payload: Messages
    })
}

export const newMessage = Message => dispatch=>{
    dispatch({
        type:NEW_MESSAGE,
        payload: Message
    })
}

export const setActiveVisibleProfile = activeProfile => dispatch=>{
    dispatch({
        type:SET_ACTIVE_VISIBLE_PROFILE,
        payload: activeProfile
    })
}