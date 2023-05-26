// @ts-nocheck
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import {dashboardAPIRequestGetForms,dashboardAPIRequestGetForm} from "api-requests";


const initialState = {
    forms: [],
    form: {}
}

export const getFormsAction = createAsyncThunk(
    'adminPanelForms/getFormsAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestGetForms(data).then((response: AxiosResponse) => {
            return response.data?.forms
        }).catch((error: AxiosError) => {
            console.log(error)
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
);

export const getFormAction = createAsyncThunk(
    'adminPanelForms/fetchAdminForm',
    async (_id: string | undefined, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await dashboardAPIRequestGetForm(_id).then((response: AxiosResponse) => {
            return response.data?.form
        }).catch((error: AxiosError) => {
            console.log(error)
        }).finally(() => thunkAPI.dispatch(loading(false)))
    }
);

export const formsSlice = createSlice({
    name: 'adminPanelForms',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFormsAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    forms: action.payload
                };
            })
            .addCase(getFormAction.fulfilled, (state, action: PayloadAction<any>) => {
                return {
                    ...state,
                    form: action.payload
                };
            })
    }
});

export const adminPanelPostsReducer = (state: RootState) => state?.forms || null;

export default formsSlice.reducer
