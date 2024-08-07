import { createAsyncThunk } from "@reduxjs/toolkit";
import {clientAPIRequestResetPassword} from "@repo/api-requests";
import { setAlert } from "@store/reducers/globalStateReducer";
const dev = process.env.NODE_ENV !== 'production';

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
            if (!dev)  localStorage.removeItem('wt');

            return {};
        }
    }
);