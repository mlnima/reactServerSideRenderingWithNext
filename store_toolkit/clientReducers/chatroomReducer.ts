import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";

const initialState = {
    onlineUsers: [],
    messages: [],
    activeVisibleProfile: {}
}

export const chatroomSlice = createSlice({
    name: 'chatroom',
    initialState,
    reducers: {
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

export const {setOnlineUsers, setMessages, newMessage, setActiveVisibleProfile} = chatroomSlice.actions;

export const chatroomReducer = (state: RootState) => state?.chatroom || null

export default chatroomSlice.reducer