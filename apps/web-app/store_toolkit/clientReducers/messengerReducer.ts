// @ts-nocheck
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
import {MessengerState} from "typescript-types/src/storeTypes/MessengerState";

const initialState: MessengerState = {
    conversationsList: [],
    isConversationsMenuOpen: true,
    activeConversation: {
        _id: '',
        messages: [],
        users: [],
        status: 'active',
        createdAt: null,
        updatedAt: null,
    },
    isMaximized: false,
    autoScroll: true,
    draftMessage: {
        imageContent: '',
        videoContent: '',
        audioContent: '',
        textContent: '',
    },
}


export const messengerSlice = createSlice({
    name: 'messenger',
    initialState,
    reducers: {
        setMessengerState: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            }
        },
        setDraftMessageData: (state, action: PayloadAction<any>) => {
            return {
                ...state,
                draftMessage:{
                    ...state.draftMessage,
                    ...action.payload
                }
            }
        },
        cleanActiveConversation: (state) => {
            return {
                ...state,
                activeConversation: {
                    _id: '',
                    messages: [],
                    users: [],
                    status: 'active',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            }
        },
        newMessageInActiveConversation: (state, action: PayloadAction<{messages:IMessengerConversation[]}>) => {
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
        })
        // .addCase(startAConversationAction.fulfilled, (state, action: PayloadAction<any>) => {
        //     return {
        //         ...state,
        //         ...action.payload
        //     }
        // })
        .addCase(getAConversationAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeConversation: action.payload.activeConversation
            }
        }).addCase(deleteAConversationAction.fulfilled, (state, action: PayloadAction<any>) => {

            state.conversationsList = state.conversationsList.filter((conversation: IMessengerConversation) => {
                return conversation?._id !== action.payload
            })
        }).addCase(loadOlderMessagesAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeConversation: {
                    ...state.activeConversation,
                    messages: [...state.activeConversation.messages, ...action.payload.messages]
                }
            }
        })
})


export const {
    setMessengerState,
    cleanActiveConversation,
    newMessageInActiveConversation,
    setDraftMessageData,
} = messengerSlice.actions

export const settingsReducer = (state: RootState) => state?.messenger || null

//@ts-ignore
export default messengerSlice.reducer