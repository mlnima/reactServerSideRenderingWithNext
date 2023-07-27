
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "@store/store";
import {getConversationsListAction} from "@store/reducers/messengerActions/getConversationsListAction";
import {getAConversationAction} from "@store/reducers/messengerActions/getAConversationAction";
import {
    loadOlderMessagesAction
} from "@store/reducers/messengerActions/loadOlderMessagesAction";
import {IMessengerConversation} from "typescript-types";
import {deleteAConversationAction} from "@store/reducers/messengerActions/deleteAConversation";
import {startAConversationAction} from "@store/reducers/messengerActions/startAConversationAction";
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


// @ts-ignore
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
        //@ts-ignore
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
//@ts-ignore
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

            // @ts-ignore
            state.conversationsList = state.conversationsList.filter((conversation: IMessengerConversation) => {
                return conversation?._id !== action.payload
            })
        }).addCase(loadOlderMessagesAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                activeConversation: {
                    ...state.activeConversation,
                    messages: [...(state.activeConversation?.messages||[]), ...action.payload.messages]
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