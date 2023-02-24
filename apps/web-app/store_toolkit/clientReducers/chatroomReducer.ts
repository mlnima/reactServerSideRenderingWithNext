// @ts-nocheck
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const initialState = {
    onlineUsers: [],
    messages: [],
    activeVisibleProfile: {},
    isMaximized:false
}

export const chatroomSlice = createSlice({
    name: 'chatroom',
    initialState,
    reducers: {
        setMaximize: (state, action: PayloadAction<any>) => {
            state.isMaximized = !state.isMaximized
        },
        setOnlineUsers: (state, action: PayloadAction<any>) => {
            state.onlineUsers = action.payload
        },
        setMessages: (state, action: PayloadAction<any>) => {
            state.messages = action.payload
        },
        newMessage: (state, action: PayloadAction<any>) => {
            state.messages = [...state.messages, action.payload]
        },
        setActiveVisibleProfile: (state, action: PayloadAction<any>) => {
            state.activeVisibleProfile = action.payload
        }
    }
})

export const {setOnlineUsers, setMessages, newMessage, setActiveVisibleProfile,setMaximize} = chatroomSlice.actions;

export const chatroomReducer = (state: RootState) => state?.chatroom || null

export default chatroomSlice.reducer