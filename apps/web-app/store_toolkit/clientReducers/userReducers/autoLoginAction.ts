import { createAsyncThunk } from "@reduxjs/toolkit";
import getSignedInUserData from "api-requests/src/common/users/getSignedInUserData";

interface AutoLoginActionArgs {
    fields: string[];
}

interface AutoLoginActionResponse {
    loggedIn: boolean;
    userData?: any; // Replace "any" with actual type of userData
}

export const autoLoginAction = createAsyncThunk<AutoLoginActionResponse, AutoLoginActionArgs>(
    'user/autoLoginAction',
    async ({ fields }, thunkAPI) => {
        if (localStorage.wt) {
            try {
                const response = await getSignedInUserData(fields);
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