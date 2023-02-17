import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {loading} from "./globalStateReducer";
import {AxiosError, AxiosResponse} from "axios";
import {RootState} from "../store";
import getForms from "api-requests/src/dashboard/forms/getForms";
import getForm from "api-requests/src/dashboard/forms/getForm";

const initialState = {
    forms: [],
    form: {}
}

export const getFormsAction = createAsyncThunk(
    'adminPanelForms/getFormsAction',
    async (data: {}, thunkAPI) => {
        thunkAPI.dispatch(loading(true))
        return await getForms(data).then((response: AxiosResponse) => {
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
        return await getForm(_id).then((response: AxiosResponse) => {
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
