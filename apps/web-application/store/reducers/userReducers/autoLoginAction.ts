import { createAsyncThunk } from "@reduxjs/toolkit";
import {commonAPIRequestGetSignedInUserData} from "api-requests";
import {loading} from "@store/reducers/globalStateReducer";

interface AutoLoginActionArgs {
    fields: string[];
}

interface AutoLoginActionResponse {
    loggedIn: boolean;
    userData?: any;
}

export const autoLoginAction = createAsyncThunk<AutoLoginActionResponse, AutoLoginActionArgs>(
    'user/autoLoginAction',
    async ({ fields }, thunkAPI) => {
        if (localStorage.wt) {
            try {
                thunkAPI.dispatch(loading(true))
                const response = await commonAPIRequestGetSignedInUserData(fields);
                thunkAPI.dispatch(loading(false))
                return response.data?.userData;
            } catch (error) {
                localStorage.removeItem('wt');
                return { loggedIn: false };
            }
        } else {
            return { loggedIn: false };
        }
    }
);