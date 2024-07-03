// @ts-nocheck
//not in use
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {uniqArrayBy} from "@repo/shared-util";
import {ChatroomState} from "typescript-types";

const initialState:ChatroomState = {
    autoScroll: true,
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
            return{
                ...state,
                isMaximized : !state.isMaximized
            }
        },
        setAutoScroll: (state, action: PayloadAction<any>) => {
            return{
                ...state,
                autoScroll : !state.autoScroll
            }
        },
        setOnlineUsers: (state, action: PayloadAction<any>) => {
            state.onlineUsers = action.payload
        },
        setMessages: (state, action: PayloadAction<any>) => {

            return{
                ...state,
                messages:uniqArrayBy([
                    ...state.messages,
                    ...action.payload
                ] , '_id')
            }
        },
        newMessage: (state, action: PayloadAction<any>) => {
            state.messages = [...state.messages, action.payload]
        },
        setActiveVisibleProfile: (state, action: PayloadAction<any>) => {
            state.activeVisibleProfile = action.payload
        }
    }
})

export const {setOnlineUsers, setMessages, newMessage, setActiveVisibleProfile,setMaximize,setAutoScroll} = chatroomSlice.actions;

export const chatroomReducer = (state: RootState) => state?.chatroom || null

export default chatroomSlice.reducer