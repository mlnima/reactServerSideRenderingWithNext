import {NEW_MESSAGE, SET_ACTIVE_VISIBLE_PROFILE, SET_MESSAGES, SET_ONLINE_USERS} from "@store/types";
import {AnyAction} from "redux";

//@ts-ignore
export const setChatroomUsers = (usersList): AnyAction => dispatch => {
    dispatch({
        type: SET_ONLINE_USERS,
        payload: usersList
    })
}
//@ts-ignore
export const setChatroomMessages = (Messages): AnyAction => dispatch => {
    dispatch({
        type: SET_MESSAGES,
        payload: Messages
    })
}
//@ts-ignore
export const newMessage = (Message): AnyAction => dispatch => {
    dispatch({
        type: NEW_MESSAGE,
        payload: Message
    })
}
//@ts-ignore
export const setActiveVisibleProfile = (activeProfile): AnyAction => dispatch => {
    dispatch({
        type: SET_ACTIVE_VISIBLE_PROFILE,
        payload: activeProfile
    })
}