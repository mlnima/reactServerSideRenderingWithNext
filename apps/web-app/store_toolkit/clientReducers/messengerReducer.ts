import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store_toolkit/store";
import {getConversationsListAction} from "@store_toolkit/clientReducers/messengerActions/getConversationsListAction";
import {getAConversationAction} from "@store_toolkit/clientReducers/messengerActions/getAConversationAction";
import {
    loadOlderMessagesAction
} from "@store_toolkit/clientReducers/messengerActions/loadOlderMessagesAction";
import {IMessengerConversation} from "typescript-types/src/messengerTypes/IMessengerConversation";
import {deleteAConversationAction} from "@store_toolkit/clientReducers/messengerActions/deleteAConversation";
import {startAConversationAction} from "@store_toolkit/clientReducers/messengerActions/startAConversationAction";

interface MessengerStateRaw {
    conversationsList: {}[],
    isConversationsMenuOpen: boolean,
    activeConversation: {
        messages: {}[]
    },
    isMaximized: boolean,
    autoScroll: boolean,
}

const initialState: MessengerStateRaw = {
    conversationsList: [],
    isConversationsMenuOpen: true,
    activeConversation: {
        messages: []
    },
    isMaximized: false,
    autoScroll: true,
}


export const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        setMaximize: (state, action: PayloadAction<any>) => {
            state.isMaximized = !state.isMaximized
        },

        setAutoScroll: (state, action: PayloadAction<any>) => {
            state.autoScroll = action.payload
        },
        setIsConversationsMenuOpen: (state, action: PayloadAction<any>) => {
            state.isConversationsMenuOpen= action.payload
        },
        cleanActiveConversation: (state, action) => {
            return {
                ...state,
                activeConversation: {
                    messages: []
                }

            }
        },
        newMessageInActiveConversation: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeConversation: {
                    ...state.activeConversation,
                    messages: [...(state.activeConversation?.messages || []), action.payload]
                }
            }
        },
    },

    extraReducers: (builder) => builder
        .addCase(getConversationsListAction.fulfilled, (state, action: PayloadAction<any>) => {

            return {
                ...state,
                conversationsList: [
                    ...state.conversationsList,
                    ...action.payload
                ]
            }
        }).addCase(startAConversationAction.fulfilled, (state, action: PayloadAction<any>) => {
            state.activeConversation = action.payload
        }).addCase(getAConversationAction.fulfilled, (state, action: PayloadAction<any>) => {
            state.activeConversation = action.payload
        }).addCase(deleteAConversationAction.fulfilled, (state, action: PayloadAction<any>) => {

            state.conversationsList = state.conversationsList.filter((conversation: IMessengerConversation) => {
                return conversation?._id !== action.payload
            })
        }).addCase(loadOlderMessagesAction.fulfilled, (state, action: PayloadAction<any>) => {
            state.activeConversation.messages = [...state.activeConversation.messages, ...action.payload.messages]
        })
})


export const {
    setMaximize,
    setIsConversationsMenuOpen,
    cleanActiveConversation,
    setAutoScroll,
    newMessageInActiveConversation
} = messengerSlice.actions

export const settingsReducer = (state: RootState) => state?.messenger || null

export default messengerSlice.reducer