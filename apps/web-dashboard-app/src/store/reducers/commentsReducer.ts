import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosInstance} from "api-requests";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import getComments from "api-requests/src/dashboard/comments/getComments";
import deleteComments from "api-requests/src/dashboard/comments/deleteComments";

const initialState = {
    comments: [],
    comment: {},
    totalCount: 0
}

export const getCommentsAction = createAsyncThunk(
    'adminPanelComments/getCommentsAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await getComments(data).then((response: AxiosResponse) => {
            return response.data
        }).catch((error: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)


export const deleteCommentsAction = createAsyncThunk(
    'adminPanelComments/deleteCommentsAction',
    async (commentsIds: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await deleteComments(commentsIds).then((res) => {
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