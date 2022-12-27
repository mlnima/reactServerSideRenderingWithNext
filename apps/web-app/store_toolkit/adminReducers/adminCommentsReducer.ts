import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "../clientReducers/globalStateReducer";
import Axios from "@_variables/Axios";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import getComments from "api-requests/src/dashboard/comments/getComments";
import deleteComments from "api-requests/src/dashboard/comments/deleteComments";

const initialState = {
    comments: [],
    comment: {}
}

export const fetchAdminPanelGetComments = createAsyncThunk(
    'adminPanelComments/fetchAdminPanelGerComments',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getComments(data).then((response: AxiosResponse) => {
            return response.data?.comments
        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminPanelDeleteComments = createAsyncThunk(
    'adminPanelComments/fetchAdminPanelGerComments',
    async (commentsIds: string[], thunkAPI) => {
        thunkAPI.dispatch(loading(true))

        return await deleteComments(commentsIds)
            .then((res) => {
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


export const adminPanelCommentsSlice = createSlice({
    name: 'adminPanelComments',
    initialState,
    reducers: {},
    extraReducers: (builder) => builder
        .addCase(fetchAdminPanelGetComments.fulfilled, (state, action: PayloadAction<any>) => {
            return {
                ...state,
                comments: action.payload || []
            };
        })
})


export const adminPanelCommentsReducer = (state: RootState) => state?.adminPanelComments || null
export default adminPanelCommentsSlice.reducer