// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "@store/reducers/globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {
    dashboardAPIRequestGetChatrooms,
    dashboardAPIRequestGetChatroom,
    // dashboardAPIRequestCreateChatroom
} from "@repo/api-requests";
import {RootState} from "@store/store";


const initialState = {
    chatrooms: [],
    chatroom: {}
}

export const getChatroomsAction = createAsyncThunk(
    'adminPanelPages/getChatroomsAction',
    async ( data:null,thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestGetChatrooms().then((response: AxiosResponse) => {
            console.log(response.data)
            return response.data?.chatrooms
        }).catch((error: AxiosError) => {
             return []
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const getChatroomAction = createAsyncThunk(
    'adminPanelPages/getChatroomAction',
    async (chatroomId: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestGetChatroom(chatroomId).then((response: AxiosResponse) => {
            return response.data?.chatroom
        }).catch((error: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

// export const createChatroomAction = createAsyncThunk(
//     'adminPanelPages/getChatroomAction',
//     async (data: string, thunkAPI) => {
//         thunkAPI.dispatch(loading(true))
//         return await createChatroom(data).then((response: AxiosResponse) => {
//             return response.data?.chatroom
//         }).catch((error: AxiosError) => {
//
//         }).finally(() => thunkAPI.dispatch(loading(false)))
//     }
// )


export const chatroomsSlice = createSlice({
    name: 'adminPanelChatrooms',
    initialState,
    reducers: {
        editChatroomFieldAction:(state, action: PayloadAction<any>) =>{
            return {
                ...state,
                chatroom: {
                    ...state.chatroom,
                    ...action.payload
                }
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getChatroomsAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    chatrooms: action.payload
                };
            })
            .addCase(getChatroomAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    chatroom: action.payload
                };
            })

    }
})

export const {editChatroomFieldAction} = chatroomsSlice.actions

export const chatroomsReducer = (state: RootState) => state?.chatrooms || null

export default chatroomsSlice.reducer