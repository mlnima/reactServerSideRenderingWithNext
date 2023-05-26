// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import {dashboardAPIRequestGetComments,dashboardAPIRequestDeleteComments} from "api-requests";


const initialState = {
    comments: [],
    comment: {},
    totalCount: 0
}

export const getCommentsAction = createAsyncThunk(
    'adminPanelComments/getCommentsAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestGetComments(data).then((response: AxiosResponse) => {
            return response.data
        }).catch((error: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const deleteCommentsAction = createAsyncThunk(
    'adminPanelComments/deleteCommentsAction',
    async (commentsIds: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await dashboardAPIRequestDeleteComments(commentsIds).then((res) => {
            thunkAPI.dispatch(setAlert({
                message: res.data.message || 'Comment Deleted',
                type: 'success'
            }))

        }).catch(err => {
            thunkAPI.dispatch(setAlert({
                message: 'Error While Deleting Comment',
                type: 'error',
                err
            }))

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const commentsSlice = createSlice({
    name: 'adminPanelComments',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(getCommentsAction.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                ...action.payload
            };
        })
})


export const commentsReducer = (state: RootState) => state?.comments || null
export default commentsSlice.reducer