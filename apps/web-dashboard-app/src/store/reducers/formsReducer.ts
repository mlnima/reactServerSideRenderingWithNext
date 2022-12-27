import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading, setAlert} from "./globalStateReducer";
import {AxiosInstance} from "api-requests";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import getForms from "api-requests/src/dashboard/forms/getForms";
import getForm from "api-requests/src/dashboard/forms/getForm";
import deleteForm from "api-requests/src/dashboard/forms/deleteForm";

const initialState = {
    forms: [],
    form: {}
}

export const fetchAdminForms = createAsyncThunk(
    'adminPanelForms/fetchAdminForms',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            ...data,
            token: localStorage.wt
        };
        return await getForms(data).then((response: AxiosResponse) => {
            return response.data?.forms
        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminForm = createAsyncThunk(
    'adminPanelForms/fetchAdminForm',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            token: localStorage.wt
        };
        // return await AxiosInstance.post('/api/admin/forms/getFormData', body).then((response: AxiosResponse) => {
        return await getForm(_id).then((response: AxiosResponse) => {
            return response.data?.form
        }).catch((err: AxiosError) => {

        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const fetchAdminDeleteForm = createAsyncThunk(
    'adminPanelForms/fetchAdminDeleteForm',
    async (_id: string, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        const body = {
            _id,
            token: localStorage.wt
        };
        return await deleteForm(_id)
            .then((response: AxiosResponse) => {
            thunkAPI.dispatch(setAlert({
                message: 'Deleted',
                type: 'success',
            }))
            return _id
        }).catch((err: AxiosError) => {
            thunkAPI.dispatch(setAlert({
                message: 'Error While Deleting Form',
                type: 'error',
                err
            }))
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
)

export const formsSlice = createSlice({
    name: 'adminPanelForms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminForms.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    forms: action.payload
                };
            })
            .addCase(fetchAdminForm.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    form: action.payload
                };
            })
            .addCase(fetchAdminDeleteForm.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    // form: action.payload
                };
            })
    }
})


export const adminPanelPostsReducer = (state: RootState) => state?.forms || null

export default formsSlice.reducer
