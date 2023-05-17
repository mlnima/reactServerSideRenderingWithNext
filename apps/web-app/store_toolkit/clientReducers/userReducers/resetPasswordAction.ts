import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientAPIRequestResetPassword} from "api-requests";
import { setAlert } from "@store_toolkit/clientReducers/globalStateReducer";

interface ResetPasswordActionArgs {
    // Replace "any" with actual type of data
    data: any;
}

interface ResetPasswordActionResponse {
    userData?: any; // Replace "any" with actual type of userData
}

export const resetPasswordAction = createAsyncThunk<ResetPasswordActionResponse, ResetPasswordActionArgs>(
    'user/resetPasswordAction',
    async ({ data }, thunkAPI) => {
        try {
            const response = await clientAPIRequestResetPassword(data);
            thunkAPI.dispatch(
                setAlert({ message: 'Password Successfully Changed', type: 'success' })
            );
            return response.data?.userData;
        } catch (error) {
            thunkAPI.dispatch(
                setAlert({ message: 'Old Password Is Not Valid', type: 'error' })
            );
            localStorage.removeItem('wt');
            return {};
        }
    }
);